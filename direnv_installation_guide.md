# How to Install `direnv` on Windows and macOS

## For Microsoft Windows

1. **Install Windows Subsystem for Linux (WSL)** if not already installed:

   - Open PowerShell as Administrator and run:
     ```powershell
     wsl --install
     ```
   - Restart your computer if prompted.

2. **Open WSL (Linux terminal) and install `direnv`**:

   - Once WSL is installed and set up, open a WSL terminal (e.g., Ubuntu) and run:
     ```bash
     sudo apt update
     sudo apt install direnv
     ```

3. **Configure `direnv`** in your shell (Bash, Zsh, etc.):
   - Add the following to your shell configuration file (e.g., `~/.bashrc` for Bash or `~/.zshrc` for Zsh):
     ```bash
     eval "$(direnv hook bash)"  # or use "zsh" if using Zsh
     ```
   - Reload the shell configuration:
     ```bash
     source ~/.bashrc  # or ~/.zshrc
     ```

## For macOS

1. **Install `direnv` using Homebrew**:

   - Open a terminal and run:
     ```bash
     brew install direnv
     ```

2. **Configure `direnv`** in your shell:
   - Add the following line to your shell configuration file (e.g., `~/.bashrc` for Bash or `~/.zshrc` for Zsh):
     ```bash
     eval "$(direnv hook bash)"  # or "zsh" for Zsh
     ```
   - Then reload the shell configuration:
     ```bash
     source ~/.bashrc  # or ~/.zshrc
     ```

## Verifying Installation

Once installed, you can verify by running:

```bash
direnv version
```

Let me know if you run into any issues with the installation!

## Activating `direnv` in a Folder

To activate `direnv` in a specific folder, follow these steps:

1. **Navigate to the folder** where you want to use `direnv`:

   ```bash
   cd /path/to/your/folder
   ```

2. **Create an `.envrc` file** in the folder and add any environment variables or commands you want to set:

   ```bash
   echo 'export OPEN_AI_KEY="Your Key"' > .envrc
   ```

3. **Allow the `.envrc` file** by running the following command:

   ```bash
   direnv allow
   ```

4. Now, every time you enter this folder, `direnv` will automatically load the environment variables and commands specified in `.envrc`. If you make changes to `.envrc`, run `direnv allow` again to apply them.

---

Let me know if you have any further questions about using `direnv`!
