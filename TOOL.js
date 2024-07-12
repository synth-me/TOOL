// Last Stable Version: 12/07/2024 
// Adição de texto - Arthur 

function onLoad(evt){

    /**
    * Está função é um alias para o console.log apenas para uso geral 
    * 
    * @param {any} x É o valor a ser impresso
    *
    **/ 
    print = function (x){ 
        console.log(x) 
    }; 
    
    /**
    * Esta função serve como alias para imprimir estruturas internas
    * do javascript como maneiras legiveis para os usuarios
    * 
    * @param {Object} x É o objeto que se quer observar
    * @returns {string} Retorna o valor como string que foi impresso 
    **/
    
    pretty_print = function (x){
        console.log(JSON.stringify(x))
        return JSON.stringify(x); 
    } 
    
    /**
    * Esta função mapeia todos os elementos filho de um elemento
    * alvo e aplica uma função em todos, retorno o valor de cada
    * função na mesma posição daquele nó
    *
    * @param {Element} element É o elemento com os filhos
    * @param {callable} f É a função que será aplicada 
    * @param {array}: São os nós resultantes após a aplicação da função
    *
    **/
    mapNode = (element,f) => {
        if(Array.isArray(element)){
            return element.map(f); 
        }else{
             const childBlocks = element.getChildNodes(); 
             const items = [];
             for(var i=0;i<childBlocks.getLength(); i++){
                items.push(
                    f(childBlocks.item(i))
                )
            }
            return items; 
        }
    }  
    
    /**
    * Esta função extende a função mapNode, de modo que cada nó 
    * seja uma instancia do objeto P_ bem como o array resultante
    * utilize o método _.chain da biblioteca underscore.js e assim
    * diversas funções de alta ordem possam ser encadeadas bem como 
    * os métodos do objeto P_
    * 
    * @param {Element} element É o elemento com os nós filhos 
    * @returns {array}: É um array de instancia _ que contem todos os nós filhos  
    *
    **/
    childIterator = (element) => {
        return _.chain(mapNode(element, (x) => new P_(x))); 
    } 
    
    
    /**
    * Esta função serve como uma camada de abstração entre os nós de 
    * animação. Ao observar que em diversas telas há um padrão no qual 
    * uma animação começa e outra deve terminar, basta passar como argumento
    * os nós que tem estas animações que ao chamar a função com 0 ou 1 então
    * ela irá inicar ou terminar.  
    *
    * @param {bool} Valor 0 ou 1, sendo 0 inicia a animção 1 e termina a animação 2 
    * @param {Element} Nó de animação 1 
    * @param {Element} Nó de animação 2 
    * @returns 
    * 
    **/
    stateful_animation = function (state,animate1,animate2){

        animate1 = new P_(animate1)
        animate2 = new P_(animate2)

        if(state){
            x = animate1;
            y = animate2;
        }else{
            x = animate2;
            y = animate1;
        }
        x.start();
        y.stop();
    }
    
    /**
    * Esta classe permite abstrair o objeto elemento de todas as funções  
    * que são aplicadas sobre um elemento, assim as funções podem ser encadeadas
    * sem a necessidade de criar novas variaveis ou constantes para armazenar os 
    * valores anteriores 
    *
    * @class 
    * @param {Element} element É o elemento que passará a ter as caracteristicas citadas 
    *
    **/
    
    P_ = function(element){

       this.element = element; // define o elemento como um atributo da classe 
       
       /**
       * Esta função serve para captar todos os atributos do elemento 
       * e expor estes atributos como atributos de um objeto, de modo que 
       * tais caracteristicas sejam acessiveis sem a necessidade da API: 
       * x.getAttribute("Fill") === x.Fill
       * 
       * @method 
       * @param {Element} element É o elemento que será extraída os atributos
       * @param {P_} main_ É o elemento do objeto atual, que serão modificadas os atributos 
       *
       **/
       this.update = function (element,main_){       
           var l = element.getAttributes() ; 
           var attributes_ = {}; 
           for (var i = 0; i < l.length; i++) {
             var attributeName = l.item(i).name;
             var attributeValue = l.item(i).value;             
             main_[attributeName] = attributeValue ;
           }
       }
       
       this.update(element,this);
       
       this.exit = function(){
           return this.element ;
       }
       
       this.getChild = function (child_name) {
           this.update(this.element,this);
           return new P_(this.element.getChild(child_name))
       }
       
       this.getAttribute = function (attribute) {
           this.update(this.element,this);
           return this.element.getAttribute(attribute);
       };
       
       this.getChildNodes = function () {
           this.update(this.element,this);
           return this.element.getChildNodes();
       };
       
       this.getElementsByTagName = function (tagName) {
           this.update(this.element,this);
           return this.element.getElementsByTagName(tagName);
       };
       
       this.getFirstChild = function () {
           this.update(this.element,this);
           return this.element.firstChild;
       };
       
       this.getLastChild = function () {
           this.update(this.element,this);
           return this.element.getLastChild();
       };
       
       this.getNextSibling = function () {
           this.update(this.element,this);
           return this.element.getNextSibling();
       };
       
       this.getOwnerDocument = function () {
           this.update(this.element,this);
           return this.element.getOwnerDocument();
       };

       this.getParentNode = function () {
           this.update(this.element,this);
           return this.element.getParentNode();
       };

       this.getPreviousSibling = function () {
           this.update(this.element,this);
           return this.element.getPreviousSibling();
       };

       this.getTagName = function () {
           this.update(this.element,this);
           return this.element.getTagName();
       };

       this.hasAttribute = function (attribute) {
           this.update(this.element,this);
           return this.element.hasAttribute(attribute);
       };

       this.hasChildNodes = function () {
           this.update(this.element,this);
           return this.element.hasChildNodes();
       };
       
       this.isSameNode = function (nodeName) {
           this.update(this.element,this.exit());
           return this.element.isSameNode(nodeName);
       };
       
       this.createElement = function (element) {
           this.update(this.element,this);
           return new CustomElement(this.element.createElement(element));
       };

       this.getDocumentElement = function () {
           this.update(this.element,this);
           return this.element.documentElement;
       };

       this.getElementById = function (id) {
           this.update(this.element,this);
           return this.element.getElementById(id);
       };

       this.getLength = function () {
           this.update(this.element,this);
           return this.element.length;
       };

       this.item = function (index) {
           this.update(this.element,this);
           return this.element.item(index);
       };
       
       /*-------------------------*/
       
       this.appendChild = function (nodeChild) {
           this.element.appendChild(nodeChild);
           this.update(this.element,this);
           return this;
       };
       
       this.insertBefore = function (nodeChild, nodeTarget) {
           this.element.insertBefore(nodeChild, nodeTarget);
           this.update(this.element,this);
           return this;
       };

       this.removeAttribute = function (attribute) {
           this.element.removeAttribute(attribute);
           this.update(this.element,this);
           return this;
       };

       this.removeChild = function (nodeChild) {
           this.element.removeChild(nodeChild);
           this.update(this.element,this);
           return this;
       };

       this.replaceChild = function (nodeChild, nodeTarget) {
           this.element.replaceChild(nodeChild, nodeTarget);
           this.update(this.element,this);
           return this;
       };
       

       this.setAttribute = function (attribute, value) {
           this.element.setAttribute(attribute, value);
           this.update(this.element,this);
           return this;
       };
       
       this.setAttributeFromObject = function (object) {           
           for(let attribute in object){
               var value = object[attribute];
               this.element.setAttribute(attribute.toString(),value);  
           };         
           this.update(this.element,this);
           return this ; 
       };
      
      /**
      *
      * Este método tem como principio ser um alias para habilitar um nó
      * de animação. Quando o objeto que foi tansformado em P_ é identificado
      * como uma animação ele passa a ter como utilizar este método para 
      * modificar seu estado de animação 
      * 
      * @method 
      * @returns {P_} retorna o próprio elemento 
      *
      **/           
      this.start = function (){
        if(""+this.element.getTagName() === 'Animate'){
            this.element.setAttribute("Animation","Start")
        }
        return this ; 
      }
      
      /**
      *
      * Este método tem como principio ser um alias para desabilitar um nó
      * de animação. Quando o objeto que foi tansformado em P_ é identificado
      * como uma animação ele passa a ter como utilizar este método para 
      * modificar seu estado de animação 
      * 
      * @method 
      * @returns {P_} retorna o próprio elemento 
      *
      **/ 
      this.stop = function (){
        if(""+this.element.getTagName() === 'Animate'){
            this.element.setAttribute("Animation","Stop")
        }
        return this; 
      }
       
       /* ------------------------------------------ */
       
       
       /** 
       * Cada uma dessas propriedades é um alias para os diferentes eventos 
       * que cada nó pode ter 
       *
       * @property {string} CLICK_EVENT
       * @property {string} OVER_EVENT
       * @property {string} OUT_EVENT
       * @property {string} UP_EVENT
       * @property {string} DOWN_EVENT
       * @property {string} MOVE_EVENT
       *
       **/
       this.CLICK_EVENT = 'MouseClickEvent';
       this.OVER_EVENT  = 'MouseOverEvent' ;
       this.OUT_EVENT   = 'MouseOutEvent'  ;
       this.UP_EVENT    = 'MouseUpEvent'   ;
       this.DOWN_EVENT  = 'MouseDownEvent' ;
       this.MOVE_EVENT  = 'MouseMoveEvent' ;  
       this.CHANGE_EVENT = 'SignalChangeEvent'; 
       
       /**
       * Um método primitivo de atribuição de uma função a um evento 
       * que retorna uma função que toma como argumento o elemento a função
       * a ser attribuida 
       * 
       * @method 
       * @param {Element} event É o nome do evento a ser atribuido 
       * @returns {callable} É a função de atribuição de função a evento  
       *
       **/
       this.onEventPrimitive = function (event){
           return (element,callable) => {                
                this.element.addEventListener(event,callable,false);
                this.update(this.element,this);
                return this; 
           }
       }
       
       /**
       * Cada um desses métodos é um alias que utiliza outro alias dos eventos e a primitiva
       * de atribuição de modo que simplfica a utilização de atribuição de funções a evento
       * 
       * @method 
       * @param {callable} É a função que será atribuida ao evento em questão
       * 
       **/
       this.onClick = (callable) => this.onEventPrimitive(this.CLICK_EVENT)(this.element,callable);
       this.onOver  = (callable) => this.onEventPrimitive(this.OVER_EVENT)(this.element,callable);
       this.onOut   = (callable) => this.onEventPrimitive(this.OUT_EVENT)(this.element,callable);
       this.onUp    = (callable) => this.onEventPrimitive(this.UP_EVENT)(this.element,callable);
       this.onDown  = (callable) => this.onEventPrimitive(this.DOWN_EVENT)(this.element,callable);
       this.onMove  = (callable) => this.onEventPrimitive(this.MOVE_EVENT)(this.element,callable);
       this.onChange  = (callable) => this.onEventPrimitive(this.MOVE_EVENT)(this.element,callable);
       
       /* ------------------------------------------ */
       
       /**
       * Essa função mapeia a função 'callable' para todos os elementos filho
       * do elemento atual. Além disso também ja cria uma instancia do objeto atual
       * para todos os nós filhos permitindo usar todos os métodos também nos filhos 
       *
       * @method 
       * @param {callable} callable É a função que será mapeada  
       * @returns {P_} Retorna o próprio elemento para encadeamento 
       **/       
       this.map = function(callable){ 
          mapNode(this,(x) => {callable(new P_(x))});
          return this ; 
       }; 
        
        
       /* ------------------------------------------ */
             
   }
   
   /**
   * Esse objeto simplesmente contém uma camada de abstração para 
   * que sempre o último elemento de uma lista de nós seja o elemento 
   * onOver de modo que não há o problema de ao modificar o tamanho de 
   * um componente com zoom in ele arraste os componentes das laterais junto
   *
   * @class 
   * @param {Element} node É o elemento event.getCurrentTarget() que vem quando o script está no componente em questão
   **/
   layerTopping = function(node){
        
        /**
        * Instancia de P_ para simplificar os processos 
        *
        * @property {P_} node A instancia em si
        * 
        **/ 
        this.node = new P_(node) ; 
        
        /**
        * Este método gera um nó novo com Tag "Component" para ser usado posteriormente 
        *  
        * @method 
        * @param {string} name É o nome do novo nó
        * @returns {Element} É o componente do tipo Element gerado com o nome em questão
        **/
        this.generate_node = (name) => {
            return new P_(document.createElement("Component"))
                                  .setAttribute("Name",name)
                                  .exit();
        }
        
        // cria o placeholde, que servirá para evitar bagunça a ordenação da lista 
        this.node.appendChild(this.generate_node("placeholder"));
        
        // inicializa o objeto 
        this.apply = () => this.distribute_events();
        
        /**
        * O método appending_ começa criando um nó temporário chamado TempNode usando o método generate_node. 
        * Em seguida, ele localiza um nó de placeholder existente dentro da árvore de nós e o remove da árvore. 
        * Após isso, o placeholder é substituído pelo TempNode, inserindo assim o nó temporário na posição 
        * anteriormente ocupada pelo placeholder.
        * Com o TempNode agora na árvore, o próximo passo é substituir o TempNode pelo realNode, o nó real que se deseja inserir na árvore. 
        * A árvore de nós é então modificada novamente para adicionar o TempNode de volta, mas agora ele é posicionado como um nó filho adicional.
        * Finalmente, o realNode é substituído pelo TempNode, completando a sequência de trocas e adições. 
        * Esse método utiliza o TempNode como um placeholder temporário para garantir que o realNode seja inserido e posicionado corretamente 
        * dentro da árvore de nós, mantendo a integridade da estrutura enquanto realiza a inserção ordenada do nó real.
        *
        * @method 
        * @param {Element} currentNode É o nome no qual o onOve está localizado 
        * @returns {bool}: simplesmente retorna verdadeiro 
        *
        **/
        this.appending_ = (currentNode) => {                  
            const TempNode = this.generate_node("TempNode");
            
            const placeholder = this.node.getChild("placeholder").exit();                                    
            
            this.node
                .replaceChild(TempNode,placeholder)
                .replaceChild(placeholder,currentNode)
                .appendChild(TempNode)
                .replaceChild(currentNode,TempNode);
            
            return true; 
        
        }
        
        /**
        * A função que identifica se o nó atual já o último, se não for
        * então chama a função this.appending_ 
        *
        * @method 
        * @param {Element} event O evento de onOver padrão 
        * 
        **/        
        this.onOver = (event) => {
            
            const last_child = this.node.getLastChild();
            if(!(last_child).isSameNode(event.getCurrentTarget())){         
                this.appending_(event.getCurrentTarget());
            }
            
        }

        /**
        * Este método distribui os eventos onOver em todos os nós que são possíveis 
        * e assim, neste caso, automaticamente lida com erros caso o nó não seja 
        * capaz de receber atributo 
        *
        * @method 
        *
        **/ 
        this.distribute_events = () => {
             this.node
                 .map((element) => {                 
                    try{
                        element.onOver(this.onOver)
                    }catch(e){
                        console.log(`Could not insert onOver on element of tag: ${element.getTagName()}`)
                    }
                })            
        }; 
    };
   
   /**
    * Esse objeto contém todas as cores ja codificadas em HTML 
    * feitos para simplificar o processo de seleção de cores 
    * 
    **/
    htmlColors = {
      "black": "#000000",
      "silver": "#C0C0C0",
      "gray": "#808080",
      "grey": "#808080",
      "white": "#FFFFFF",
      "maroon": "#800000",
      "red": "#FF0000",
      "purple": "#800080",
      "fuchsia": "#FF00FF",
      "green": "#008000",
      "lime": "#00FF00",
      "olive": "#808000",
      "yellow": "#FFFF00",
      "navy": "#000080",
      "blue": "#0000FF",
      "teal": "#008080",
      "aqua": "#00FFFF",
      "darkblue": "#00008B",
      "mediumblue": "#0000CD",
      "darkgreen": "#006400",
      "darkcyan": "#008B8B",
      "deepskyblue": "#00BFFF",
      "darkturquoise": "#00CED1",
      "mediumspringgreen": "#00FA9A",
      "springgreen": "#00FF7F",
      "cyan": "#00FFFF",
      "midnightblue": "#191970",
      "dodgerblue": "#1E90FF",
      "lightseagreen": "#20B2AA",
      "forestgreen": "#228B22",
      "seagreen": "#2E8B57",
      "darkslategray": "#2F4F4F",
      "darkslategrey": "#2F4F4F",
      "limegreen": "#32CD32",
      "mediumseagreen": "#3CB371",
      "turquoise": "#40E0D0",
      "royalblue": "#4169E1",
      "steelblue": "#4682B4",
      "darkslateblue": "#483D8B",
      "mediumturquoise": "#48D1CC",
      "indigo": "#4B0082",
      "darkolivegreen": "#556B2F",
      "cadetblue": "#5F9EA0",
      "cornflowerblue": "#6495ED",
      "rebeccapurple": "#663399",
      "mediumaquamarine": "#66CDAA",
      "dimgray": "#696969",
      "dimgrey": "#696969",
      "slateblue": "#6A5ACD",
      "olivedrab": "#6B8E23",
      "slategray": "#708090",
      "slategrey": "#708090",
      "lightslategray": "#778899",
      "lightslategrey": "#778899",
      "mediumslateblue": "#7B68EE",
      "lawngreen": "#7CFC00",
      "chartreuse": "#7FFF00",
      "aquamarine": "#7FFFD4",
      "skyblue": "#87CEEB",
      "lightskyblue": "#87CEFA",
      "blueviolet": "#8A2BE2",
      "darkred": "#8B0000",
      "darkmagenta": "#8B008B",
      "saddlebrown": "#8B4513",
      "darkseagreen": "#8FBC8F",
      "lightgreen": "#90EE90",
      "mediumpurple": "#9370DB",
      "darkviolet": "#9400D3",
      "palegreen": "#98FB98",
      "darkorchid": "#9932CC",
      "yellowgreen": "#9ACD32",
      "sienna": "#A0522D",
      "brown": "#A52A2A",
      "darkgray": "#A9A9A9",
      "darkgrey": "#A9A9A9",
      "lightblue": "#ADD8E6",
      "greenyellow": "#ADFF2F",
      "paleturquoise": "#AFEEEE",
      "lightsteelblue": "#B0C4DE",
      "powderblue": "#B0E0E6",
      "firebrick": "#B22222",
      "darkgoldenrod": "#B8860B",
      "mediumorchid": "#BA55D3",
      "rosybrown": "#BC8F8F",
      "darkkhaki": "#BDB76B",
      "mediumvioletred": "#C71585",
      "indianred": "#CD5C5C",
      "peru": "#CD853F",
      "chocolate": "#D2691E",
      "tan": "#D2B48C",
      "lightgray": "#D3D3D3",
      "lightgrey": "#D3D3D3",
      "thistle": "#D8BFD8",
      "orchid": "#DA70D6",
      "goldenrod": "#DAA520",
      "palevioletred": "#DB7093",
      "crimson": "#DC143C",
      "gainsboro": "#DCDCDC",
      "plum": "#DDA0DD",
      "burlywood": "#DEB887",
      "lightcyan": "#E0FFFF",
      "lavender": "#E6E6FA",
      "darksalmon": "#E9967A",
      "violet": "#EE82EE",
      "palegoldenrod": "#EEE8AA",
      "lightcoral": "#F08080",
      "khaki": "#F0E68C",
      "aliceblue": "#F0F8FF",
      "honeydew": "#F0FFF0",
      "azure": "#F0FFFF",
      "sandybrown": "#F4A460",
      "wheat": "#F5DEB3",
      "beige": "#F5F5DC",
      "whitesmoke": "#F5F5F5",
      "mintcream": "#F5FFFA",
      "ghostwhite": "#F8F8FF",
      "salmon": "#FA8072",
      "antiquewhite": "#FAEBD7",
      "linen": "#FAF0E6",
      "lightgoldenrodyellow": "#FAFAD2",
      "oldlace": "#FDF5E6",
      "magenta": "#FF00FF",
      "deeppink": "#FF1493",
      "orangered": "#FF4500",
      "tomato": "#FF6347",
      "hotpink": "#FF69B4",
      "coral": "#FF7F50",
      "darkorange": "#FF8C00",
      "lightsalmon": "#FFA07A",
      "orange": "#FFA500",
      "lightpink": "#FFB6C1",
      "pink": "#FFC0CB",
      "gold": "#FFD700",
      "peachpuff": "#FFDAB9",
      "navajowhite": "#FFDEAD",
      "moccasin": "#FFE4B5",
      "bisque": "#FFE4C4",
      "mistyrose": "#FFE4E1",
      "blanchedalmond": "#FFEBCD",
      "papayawhip": "#FFEFD5",
      "lavenderblush": "#FFF0F5",
      "seashell": "#FFF5EE",
      "cornsilk": "#FFF8DC",
      "lemonchiffon": "#FFFACD",
      "floralwhite": "#FFFAF0",
      "snow": "#FFFAFA",
      "lightyellow": "#FFFFE0",
      "ivory": "#FFFFF0"
    }
   
}
