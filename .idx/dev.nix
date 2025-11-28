{ pkgs }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
    pkgs.bun
  ];

  idx.extensions = [
    "bradlc.vscode-tailwindcss"
    "dbaeumer.vscode-eslint"
    "google.gemini-cli-vscode-ide-companion"
    "google.geminicodeassist"
    "googlecloudtools.cloudcode"
    "ms-toolsai.jupyter"
    "ms-toolsai.jupyter-keymap"
    "ms-toolsai.jupyter-renderers"
    "ms-toolsai.vscode-jupyter-cell-tags"
    "ms-toolsai.vscode-jupyter-slideshow"
    "svelte.svelte-vscode"
    "Vue.volar"
    "github.vscode-pull-request-github"
  ];

  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
