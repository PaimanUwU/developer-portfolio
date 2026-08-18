---
title: "Showcasing My Dotfiles"
description: "A deep dive into my personal dotfiles repository and development environment."
pubDate: "2026-03-26"
heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
tags: ["Dotfiles", "Terminal", "Setup", "Neovim"]
---

# Showcasing My Dotfiles 🔥

Welcome to a tour of my personal dotfiles repository! This is where I store and manage all my configuration files for various applications and tools, ensuring a consistent and comfortable development environment across my machines. 

You can find the full repository on GitHub: [PaimanUwU/Dotfiles](https://github.com/PaimanUwU/Dotfiles)

## Overview

This repository uses [GNU Stow](https://www.gnu.org/software/stow/) to manage symbolic links for configuration files (dotfiles) into your home directory. This keeps the home directory clean and makes it incredibly easy to add or remove configurations seamlessly.

## Features & Tools I Use

My dotfiles cover a wide range of tools that makeup my daily driver environment:

- **Neovim (nvim):** My highly customized Neovim setup for a powerful and efficient coding experience.
- **Zsh & Powerlevel10k (p10k):** A beautiful and feature-rich Zsh shell with the blazing-fast Powerlevel10k theme.
- **tmux:** My configuration for the terminal multiplexer tmux for persistent sessions and split panes.
- **yazi:** Configuration for the modern, async, and customisable terminal file manager.
- **cava:** Setup for the console-based audio visualizer.
- **neofetch:** Configuration for displaying system information with an aesthetic touch.
- **Zed:** Configurations for the Zed code editor.
- **Brewfile:** Automated installation of macOS applications and tools using Homebrew.

## Installation

Getting my dotfiles set up on a new machine is a breeze:

1. **Clone the Repository:** I recommend cloning into `~/Documents/Dotfiles`.
2. **Install Applications:** Use `brew bundle install --file=Brewfile` to install all necessary packages.
3. **Symlink Dotfiles:** Navigate to the dotfiles directory and use `stow */` to create symbolic links.

This setup has saved me countless hours whenever I need to set up a new environment or share my configs. Check out the [repository](https://github.com/PaimanUwU/Dotfiles) if you're looking for inspiration for your own dotfiles!
