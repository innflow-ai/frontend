# Homepage agent loop

`innflow-agent-seamless-loop.riv` is the supplied Rive export. Its artboard is
`Innflow Agent Seamless Loop`, its timeline is `Agent Seamless Loop`, and its
state machine is `Agent Loop Controller` (no inputs).

The JPEG from the original MP4 stays visible behind the canvas while loading,
on load failure, and for reduced motion.

The WASM files are copied from `@rive-app/webgl2` 2.44.0, used by the pinned
`@rive-app/react-webgl2` 4.36.0 dependency. When upgrading the runtime, replace
both WASM files with the versions from the installed package and update the
URLs in `agent-loop-rive.tsx`. These binaries use the accompanying MIT license.
