# Kubernetes 镜像同步脚本

只放一个示例，其余的可以参考[这里](http://keveon.sh/sync-scripts).

```bash
#! /bin/bash

docker_repo="keveon" # your docker hub username or organization name
registry="k8s.gcr.io" # the registry of original image, e.g. gcr.io, quay.io
repo="" # the repository name of original image

sync_one(){
  docker pull ${registry}/${1}:${2}
  docker tag ${registry}/${1}:${2} docker.io/${docker_repo}/${1}:${2}
  docker push docker.io/${docker_repo}/${1}:${2}
  docker rmi -f ${registry}/${1}:${2} docker.io/${docker_repo}/${1}:${2}
}

sync_all_tags() {
  for image in $*; do
    tags_str=`curl https://${registry}/v2/$image/tags/list | jq '.tags' -c | sed 's/\[/\(/g' | sed 's/\]/\)/g' | sed 's/,/ /g'`
    echo "$image $tags_str"
    src="
sync_one(){
  docker pull ${registry}/\${1}:\${2}
  docker tag ${registry}/\${1}:\${2} docker.io/${docker_repo}/\${1}:\${2}
  docker push docker.io/${docker_repo}/\${1}:\${2}
  docker rmi -f ${registry}/\${1}:\${2} docker.io/${docker_repo}/\${1}:\${2}
}
tags=${tags_str}
echo \"$image ${tags_str}\"
for tag in \${tags[@]}
do
  sync_one $image \${tag}
done;"
    bash -c "$src"
  done
}

sync_with_tags(){
  image=$1
  skip=1
  for tag in $*; do
    if [ $skip -eq 1 ]; then
	  skip=0
    else
      sync_one $image $tag
	fi
  done
}

sync_after_tag(){
  image=$1
  start_tag=$2
  tags_str=`curl https://${registry}/v2/$image/tags/list | jq '.tags' -c | sed 's/\[/\(/g' | sed 's/\]/\)/g' | sed 's/,/ /g'`
  echo "$image $tags_str"
  src="
sync_one(){
  docker pull ${registry}/\${1}:\${2}
  docker tag ${registry}/\${1}:\${2} docker.io/${docker_repo}/\${1}:\${2}
  docker push docker.io/${docker_repo}/\${1}:\${2}
  docker rmi -f ${registry}/\${1}:\${2} docker.io/${docker_repo}/\${1}:\${2}
}
tags=${tags_str}
start=0
for tag in \${tags[@]}; do
  if [ \$start -eq 1 ]; then
    sync_one $image \$tag
  elif [ \$tag == '$start_tag' ]; then
    start=1
  fi
done"
  bash -c "$src"
}

get_tags(){
  image=$1
  curl https://${registry}/v2/$image/tags/list | jq '.tags' -c
}

arch="amd64"
version ="v1.10.2"

#sync_with_tags etcd 2.0.12 2.0.13 # sync etcd:2.0.12 and etcd:2.0.13

# sync_after_tag kube-apiserver-${arch}         ${version}
# sync_after_tag kube-controller-manage-${arch} ${version}
# sync_after_tag kube-scheduler-${arch}         ${version}
# sync_after_tag kube-proxy-${arch}             ${version}
# sync_after_tag hyperkube                      ${version}

sync_all_tags kube-apiserver-${arch} kube-controller-manage-${arch} kube-scheduler-${arch} kube-proxy-${arch} hyperkube
```

参考：[利用 Katacoda 免费同步 Docker 镜像到 Docker Hub](https://imroc.io/posts/kubernetes/sync-images-to-docker-hub-using-katacoda/).
