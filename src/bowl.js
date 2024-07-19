/**
 * Função assíncrona chamada quando a página é carregada.
 * @param {Event} event - Evento de carregamento.
 */
async function onLoad(event){

    /**
     * Cria uma nova instância de Database.
     * @class
     * @param {string} name - O nome do banco de dados.
     */
    Database = function(name){
        
        /**
         * O nome do banco de dados.
         * @property {string}
         */
        this.name = name; 

        /**
         * Contêiner para armazenar as associações.
         *
         * @method
         * @property {Object}
         */
        this.container = {};
            
        /**
         * Adiciona uma nova associação ao contêiner.
         *
         * @method 
         * @param {string} bind_path - O caminho completo da associação.
         * @param {string} shortcut - O atalho para a associação.
         * @param {Function} callable - A função de callback que será chamada.
         * @returns {Database} - A instância atual para encadeamento de métodos.
         */
        this.add = function(bind_path, shortcut, callable){
            this.container[shortcut] = {
                "fullName": bind_path,
                "reaction": (composer) => {
                    const doc = document.getDocumentElement(); 
                    return callable(composer,doc);          
                } 
            };
            return this;
        };
        
        /**
         * Adiciona múltiplas associações ao contêiner a partir de um objeto.
         *
         * @method 
         * @param {Object} object - O objeto contendo as associações.
         * @returns {Database} - A instância atual para encadeamento de métodos.
         */
        this.addFromObject = function(object){
            for(let key in object){
                this.add(object[key].fullName, key, object[key].reaction);
            }
            return this;
        };
        
        /**
         * Remove uma associação do contêiner.
         * 
         * @method
         * @param {string} shortcut - O atalho da associação a ser removida.
         * @returns {Database} - A instância atual para encadeamento de métodos.
         */
        this.remove = function(shortcut){
            delete this.container[shortcut]; 
            return this;
        };
        
        /**
         * Loop assíncrono que subscreve valores e executa reações. Serve para
         * reagir a todas as mudanças das binds especificadas 
         * 
         * @method
         */
        this.loop = async function(){         
            let paths = [];
            for(let key in this.container){
                paths.push([key, this.container[key].fullName]);                
            }
            await client.subscribeValues(data => {
                data.forEach(({value, unit}, key) => {
                    const bind_name = paths.filter(x => x[1] === key)[0][0];
                    let composer = {
                        "value":value,
                        "unit":unit,
                        "name":key,
                    }
                    this.container[bind_name].reaction(composer, document.getDocumentElement());
                });            
            }, paths.map(x => x[1]));
            return this ;
        };
        
        /**
         * Obtém o valor de uma associação.
         *
         * @method
         * @param {string} shortcut - O atalho da associação.
         * @returns {Promise<number>} - O valor da associação.
         */
        this.getValue = async function(shortcut){        
            const bindPath = this.container[shortcut];    
            console.log(bindPath.fullName);
            const value_obj = await client.readValues([bindPath.fullName]);        
            return value_obj.get(bindPath.fullName).value;    
        };
        
        /**
         * Atribui o valor de uma associação.
         *
         * @method
         * @param {string} shortcut - O atalho da associação.        
         * @param {string | number} value - O valor a ser inserido. 
         */
         
         this.setValue = async function(shortcut,value){            
            await client.setValue(this.container[shortcut].fullName,value);
         }
        
        /**
         * Imprime as associações em um formato legível.
         *
         * @method
         * @returns {Database} - A instância atual para encadeamento de métodos.
         */
        this.print_binds = function(){
            pretty_print(this.container);
            return this;
        };
    };

}
