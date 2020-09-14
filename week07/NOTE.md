学习笔记

## 重学HTML
源流于XML和SGML（html5之前）

## HTML语义
aside => 非主体部分
main => 页面主题内容部分
article => 文章
h1～～5 标题
hgroup 标题合集
hr 切换话题使用
abbr 代表是缩写
em 表示语义重音，没有重音可以用strong
p 段落
figure 用作文档中插图的图像
    figcaption 为figure添加标题或者描述
ol      有序列表
    li    
ul      无序列表
    li    
nav     导航性质
dfn     标签可标记那些对特殊术语或短语的定义 (基本用语专业术语)
pre     可定义预格式化的文本
samp    表示一段用户应该对其没有什么其他解释的文本字符
code    代码
footer  底部

## html语法
element <tagname>...</tagname>
text    text
comment <!-- comments -->
documentType <!Doctype html>
processingInstruction <?a 1?>
CDATA   <![CDATA[ ]]>

## 浏览器API | DOM API
1.导航类操作：
    node Api
        parentNode
        childNodes
        firstChild
        lastChild
        nextSibling
        previousSibling
    element Api
        parentElement
        children
        firstElementChild
        lastElementChild
        nextElementSibling
        previousElementSibling
2.修改操作
    appendChild
    insertBefore
    removeChild
    replaceChild
3.高级操作
    compareDocumentPosition 是一个用于比较两个节点中关系的函数
    contains    检查一个节点是否包含另一个节点的函数
    isEqualNode 检查两个节点是否完全相同
    isSameNode  检查两个节点是否为同一个节点，实际上在js中可以使用‘===’
    cloneNode   复制一个节点，如果传入参数true，则会连同子元素做深拷贝

## 事件API
冒泡 => 由内到外传导
捕获 => 由外到内传导

## Range Api
> collapsed     如果范围的开始点和结束点在文档的同一位置，则为 true，即范围是空的，或折叠的。
> commonAncestorContainer     范围的开始点和结束点的（即它们的祖先节点）、嵌套最深的 Document 节点。
> endContainer         包含范围的结束点的 Document 节点。 
> endOffset     endContainer 中的结束点位置。
> startContainer     包含范围的开始点的 Document 节点。
> startOffset    startContainer中的开始点位置。


## CSSOM
document.styleSheets
    rules
        insertRule('p{color:pink}',0)
        removeRule(0)
getComputedStyle
    window.getComputedStyle(elt,pseudoElt);
        elt 想要获取的元素
        pseudoElt 可选，伪元素
## CSSOM view
layout
    getClientRects()
    getBoundingClientRect()
    基于document 获取位置尺寸等信息，1.可能多个盒子。2.将包含的所有盒子包括到一起