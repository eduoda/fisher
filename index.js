class Fisher{
  constructor(){
    this.hooks = {};
  }  
  addHook(type,hook,shouldAwait=false){
    if(!this.hooks.hasOwnProperty(type))
      this.hooks[type]=[];
    this.hooks[type].push({hook,shouldAwait});
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

  addListener(type,hook,shouldAwait=false){
    this.addHook(type,hook,shouldAwait);
  }
}
module.exports = Fisher;