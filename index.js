class Fisher{
  constructor(){
    this.hooks = {};
  }
  addHook(type,hook,shouldAwait=false,weight=0){
    if(!this.hooks.hasOwnProperty(type))
      this.hooks[type]=[];
    this.hooks[type].push({hook,shouldAwait,weight});
    this.hooks[type].sort((h1,h2) => {return h1.weight-h2.weight})
  }
  async fished(type,...args){
    if(!this.hooks.hasOwnProperty(type))
      return;
    for(let hook of this.hooks[type]){
      if(hook.shouldAwait)
        await hook.hook(...args);
      else
        hook.hook(...args);
    }
  }

  async emit(type,...args){
    await this.fished(type,...args);
  }

  addListener(type,hook,shouldAwait=false,weight=0){
    this.addHook(type,hook,shouldAwait,weight);
  }
}
module.exports = Fisher;
