# filterRegex 

This function is basically a wrapper for filterNode + regex. It makes easy to filter nodes based on attributes 
that can be match against regex patterns like Id and Name. Given the following tree, all one have to do is: 


![image](https://github.com/user-attachments/assets/9e971f92-a8e6-4c21-a53a-1e747b23d9e5)


```javascript
function onLoad(event){
  const p_rectangles = new P_(event.getCurrentTarget()).filterRegex('Name',/^teste\d+$/);
  if(""+p_rectangles[0].Name === 'teste1'){        
        console.log("test for filterRegex method: [passed]")
    }else{
        console.log("test for filterRegex method: [failed]")
    }
}
```

or without using P_ object:

```javascript
function onLoad(event){
  const rectangles = event.getCurrentTarget();
  const x = filterRegex(rectangles,'Name',/^teste\d+$/);
  
  if(""+x[0].getAttribute("Name") === 'teste1'){
      console.log("test for filterRegex function: [passed]")
  }else{
      console.log("test for filterRegex function: [failed]")
  }    
}
```

In this case only the node with name "test+number" was identified thanks to the regex pattern `/^teste\d+$/`. You can find 
more information on how to use regex at: [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
