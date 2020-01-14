export function injectCss(address: string): any {
  return function (target: Function) {
    let css_id = 'inject_css_' + target.name.toLowerCase();

    // TODO(fkleuver): native async import is not yet part of the official spec and webpack doesn't support this for dynamic strings. We need to finish the plugin-requirejs to offer a Loader replacement
    import(address).then(css => {
      // TODO(fkleuver): add this api to v2 // DOM.injectStyles(css, null, null, css_id);
    });

    target.prototype.injectedCssId = css_id;

    return target;

  };
}

// #region commented out codes :

    // let ctor = target.constructor;

    // setTimeout(() => {
    //   const moduleId = Origin.get(target).moduleId;
    //   console.log('moduleId: ' + moduleId); // only work after delay
    // });

    // const myModuleId = Origin.get(ctor).moduleId;
    // const absolutePath = relativeToFile(address, myModuleId);



// export function injectCss2<T extends { new(...args: any[]): {} }>(constructor: T) {
//   console.log(constructor);
//   const myModuleId = Origin.get(constructor).moduleId;
//   return class extends constructor {

//   };

// }

 //#endregion
