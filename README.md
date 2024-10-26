# AI GPT BOOTCAMP Group 7

This repository is for Group 7 of the AI and GPT Bootcamp hosted by Encode Club. It contains all weekend homework assignments and the final project.

## Repository Structure

- Each weekend's homework is organized into its respective folder.
- The final project will be located in the `final_project` folder.

## Setting Up Your Environment

To manage environment variables securely and efficiently, we recommend using `direnv`. Below are the instructions for setting up `direnv` and configuring your OpenAI API keys.

### Installing `direnv`

For detailed instructions on installing `direnv`, refer to the [direnv installation guide](direnv_installation_guide.md).

#### For Microsoft Windows

1. **Install Windows Subsystem for Linux (WSL)** if not already installed:

   - Open PowerShell as Administrator and run:
     ```powershell
     wsl --install
     ```
   - Restart your computer if prompted.

2. **Open WSL (Linux terminal) and install `direnv`**:

   - Open a WSL terminal (e.g., Ubuntu) and run:
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

#### For macOS

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

### Setting Up OpenAI API Keys

For detailed instructions on setting up your OpenAI API keys, refer to the [OpenAI API key setup instructions](/openai_setup_guide.md).

1. **Navigate to the folder** where you want to use `direnv`:

   ```bash
   cd /path/to/your/folder
   ```

2. **Create an `.envrc` file** in the folder and add your OpenAI API key:

   ```bash
   echo 'export OPEN_AI_KEY="Your Key"' > .envrc
   ```

3. **Allow the `.envrc` file** by running the following command:
   ```bash
   direnv allow
   ```

Now, every time you enter this folder, `direnv` will automatically load the environment variables and commands specified in `.envrc`. If you make changes to `.envrc`, run `direnv allow` again to apply them.

For more detailed instructions, refer to the `direnv_installation_guide.md` file.

---

Let us know if you have any questions or need further assistance!
