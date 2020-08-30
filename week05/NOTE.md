学习笔记

## 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
# 异同点：
    1.first-letter和first-line都作用于块级元；
    2.first-letter:作用于第一行的首字符；
    3.first-line:作用于第一行的所有字符；
first-line 作用于第一行的所有字符,需要计算第一行有那些元素防止重绘开销太大，影响文档流结构