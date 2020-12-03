# 在 Markdown 中使用 LaTeX 公式

- 解析前

```markdown
假设 $y >= 0$ , 而 $[\log x]$ 表示 $\log x$ 的整数部分, 设:

$$\Phi (y) = \frac {1} {2 \pi i} \int_{2 - i \infty}^{2 + i \infty} \frac {y^{\omega} \mathrm{d} \omega} {\omega \left(1 + \frac {\omega} {(\log x)^{1.1}}\right)^{[ \log x ] + 1}}, x > 1$$

显见， 当 $0 <= y <= 1$ 时， 有 $\Phi(y) = 0$. 对于所有 $y >= 0$, 则 $\Phi(y)$ 是一个非减函数.

当 $\log x>= 10^4$ 及 $y>= e^{2{(\log x)}^{-0.1}}$ 时， 则有:

$$1 - x^{- 0.1} <= \Phi (y) <= 1$$
```

- 解析后

::: theorem

假设 $y >= 0$ , 而 $[\log x]$ 表示 $\log x$ 的整数部分, 设:

$$\Phi (y) = \frac {1} {2 \pi i} \int_{2 - i \infty}^{2 + i \infty} \frac {y^{\omega} \mathrm{d} \omega} {\omega \left(1 + \frac {\omega} {(\log x)^{1.1}}\right)^{[ \log x ] + 1}}, x > 1$$

显见， 当 $0 <= y <= 1$ 时， 有 $\Phi(y) = 0$. 对于所有 $y >= 0$, 则 $\Phi(y)$ 是一个非减函数.

当 $\log x>= 10^4$ 及 $y>= e^{2{(\log x)}^{-0.1}}$ 时， 则有:

$$1 - x^{- 0.1} <= \Phi (y) <= 1$$

:::
