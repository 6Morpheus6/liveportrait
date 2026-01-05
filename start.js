module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "{{platform === 'win32' ? 'LivePortrait_env' : 'env'}}",
        env: {
          PYTORCH_ENABLE_MPS_FALLBACK: "1"
        },
        path: "app",
        message: [
          "{{args && args.mode === 'animal' ? 'python app_animals.py' : 'python app.py'}}"
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
