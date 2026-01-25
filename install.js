module.exports = {
  run: [
    {
      when: "{{platform === 'win32'}}",
      method: "script.start",
      params: {
        uri: "win.js"
      }
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "script.start",
      params: {
        uri: "common.js"
      }
    },
    {
      when: "{{gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "conda deactivate && call LivePortrait_env/Scripts/activate.bat && uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps && uv pip install -U onnxruntime-gpu && uv pip install ../wheel/multiscaledeformableattention-1.0-cp39-cp39-win_amd64.whl"
        ]
      }
    },
    {
      method: "log",
      params: {
        raw: "Finished"
      }
    }
  ]
}
