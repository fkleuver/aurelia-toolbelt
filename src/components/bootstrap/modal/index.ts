import { AureliaToolbeltBootstrapModalRenderer } from './AureliaToolbeltBootstrapModalRenderer';

export * from './abt-modal';
export * from './abt-modal-title';
export * from './abt-modal-header';
export * from './abt-modal-body';
export * from './abt-modal-footer';


// TODO(fkleuver): we don't have aurelia-dialog migrated yet
// export function configure(config: FrameworkConfiguration) {

//   config.aurelia.use.plugin(PLATFORM.moduleName('aurelia-dialog'), (rendererConfig: any) => {
//     rendererConfig.useRenderer(AureliaToolbeltBootstrapModalRenderer);
//     rendererConfig.useResource('attach-focus');
//   });

// }
