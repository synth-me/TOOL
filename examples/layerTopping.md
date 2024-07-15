
# LayerTopping 

Using the following tree structure: 

![image](https://github.com/user-attachments/assets/45ef84dc-c13b-47c5-8ad4-edd973c75007)

It is possible to add the following excerpt to the `onLoad` event of the `script`:

```javascript
function onLoad(event){
    new layerTopping(event.getCurrentTarget()).apply();
}
```

after that all the nodes will be automatically rearranged as needed. 
