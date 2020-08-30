const EOF = Symbol("EOF")
let currentToken = null;
function emit (token) {
    console.log(token)
}

function data(c) {
    if(c == '<') {
        return tagopen;
    } else if(c == EOF) {
        emit ({
            type: "EOF"
        })
        return ;
    } else {
        emit ({
            type: "text",
            content:c
        })
        return data;
    }
}

function tagopen(c) {
    if(c == '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        return
    }
}

function endTagOpen(c) {
    if(c.match(/^[a-zA-Z]$/)){
        return tagName(c);
    } else if (c == '>'){
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
    } else if (c == EOF) {

    } else {

    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttrbuteName;
    } else if (c == '/') {
        return selfCloseingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName;
    } else if (c == '>') {
        emit(currentToken)
        return data;
    } else {
        currentToken.tagName += c
        return tagName;
    }
}

function beforeAttrbuteName (c){
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttrbuteName;
    } else if (c == '>' || c == '/' || c == EOF) {
        return afterAttrbuteName(c)
    } else if (c == '=') {
        // return beforeAttrbuteName;
    } else {
       currentAttribute = {
           name: '',
           value: ''
       }
       return attributeName(c)
    }
}

function attributeName () {
    if(c.match(/^[\t\n\f]$/ || c =='/' || c == '>' || c ==EOF)){
        return afterAttrbuteName(c)
    } else if (c == '=') {
        return beforeAttrbuteValue;
    } else if (c == '\u0000') {

    } else if (c == "\"" || c == "'" || c== '<') {

    } else {
        currentAttribute.name += c;
        return attributeName
    }
}

function beforeAttrbuteValue(c) {
    if(c.match(/^[\t\n\f]$/ || c =='/' || c == '>' || c ==EOF)){
        return beforeAttrbuteValue;
    }  else if (c == "\""){
        return doubleQuotedAttributeValue;
    } else if (c == "\'") {
        return singleQuotedAttributeValue;
    } else if (c == '>') {

    } else {
        return UnQuotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.val;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if (c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.val;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function UnQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f]$/)){
        currentToken[currentAttribute.name] = currentAttribute.val;
        return beforeAttrbuteValue;
    }  else if (c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.val;
        return selfCloseingStartTag;
    } else if (c == ">'") {
        currentToken[currentAttribute.name] = currentAttribute.val;
        emit(currentToken)
        return data;
    } else if (c == '\u0000') {

    } else if(c == "\"" || c == "'" || c == "<" || c =="=" || c == "`") {
       
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return UnQuotedAttributeValue
    }
}

function selfCloseingStartTag(c) {
    if (c == '>') {
        currentToken.isSeleClosing = true;
        return data;
    } else if (c == 'EOF') {

    } else {

    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for(let c of html) {
        state = state(c)
    }
     state = state(EOF)
}