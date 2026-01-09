FROM python:3.12-slim-bookworm

# Environment variables
ENV LANG=en_US.UTF-8 \
    DEBIAN_FRONTEND=noninteractive

# Build arguments
ARG TARGETARCH

# Install system dependencies and tools
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    # Core utilities and security
    ca-certificates \
    curl \
    wget \
    git \
    gnupg \
    dirmngr \
    lsb-release \
    sudo \
    # Editors and shells
    nano \
    vim \
    zsh \
    # Development tools
    build-essential \
    python3-dev \
    npm \
    openssh-client \
    rsync \
    gettext \
    # Fonts for PDF generation
    fonts-noto-cjk \
    fonts-liberation2 \
    gsfonts \
    # Python development libraries
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libsasl2-dev \
    libldap2-dev \
    libssl-dev \
    libffi-dev \
    libjpeg-dev \
    libpq-dev \
    liblcms2-dev \
    libblas-dev \
    libatlas-base-dev \
    # Localization and compression
    locales-all \
    xz-utils && \
    # Install rtlcss globally for RTL language support
    npm install -g rtlcss && \
    # Cleanup npm cache
    npm cache clean --force && \
    # Cleanup apt cache
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install PostgreSQL client
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    # Add PostgreSQL official repository
    echo 'deb http://apt.postgresql.org/pub/repos/apt/ bookworm-pgdg main' > /etc/apt/sources.list.d/pgdg.list && \
    # Import PostgreSQL repository signing key
    GNUPGHOME="$(mktemp -d)" && \
    export GNUPGHOME && \
    repokey='B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8' && \
    gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "${repokey}" && \
    gpg --batch --armor --export "${repokey}" > /etc/apt/trusted.gpg.d/pgdg.gpg.asc && \
    gpgconf --kill all && \
    rm -rf "$GNUPGHOME" && \
    # Install PostgreSQL client
    apt-get update && \
    apt-get install --no-install-recommends -y postgresql-client && \
    # Cleanup
    rm -f /etc/apt/sources.list.d/pgdg.list && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install wkhtmltopdf for PDF report generation
ARG WKHTMLTOPDF_VERSION=0.12.6.1
ARG WKHTMLTOPDF_AMD64_CHECKSUM='98ba0d157b50d36f23bd0dedf4c0aa28c7b0c50fcdcdc54aa5b6bbba81a3941d'
ARG WKHTMLTOPDF_ARM64_CHECKSUM="b6606157b27c13e044d0abbe670301f88de4e1782afca4f9c06a5817f3e03a9c"
ARG WKHTMLTOPDF_URL="https://github.com/wkhtmltopdf/packaging/releases/download/${WKHTMLTOPDF_VERSION}-3/wkhtmltox_${WKHTMLTOPDF_VERSION}-3.bookworm_${TARGETARCH}.deb"

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    # Set checksum based on architecture
    WKHTMLTOPDF_CHECKSUM=""; \
    if [ "$TARGETARCH" = "arm64" ]; then \
    WKHTMLTOPDF_CHECKSUM="$WKHTMLTOPDF_ARM64_CHECKSUM"; \
    elif [ "$TARGETARCH" = "amd64" ]; then \
    WKHTMLTOPDF_CHECKSUM="$WKHTMLTOPDF_AMD64_CHECKSUM"; \
    else \
    echo "Unsupported architecture: $TARGETARCH" >&2; \
    exit 1; \
    fi && \
    # Download wkhtmltopdf package
    curl -fsSL -o wkhtmltox.deb "${WKHTMLTOPDF_URL}" && \
    # Verify checksum
    echo "${WKHTMLTOPDF_CHECKSUM}  wkhtmltox.deb" | sha256sum -c - && \
    # Update apt cache and install wkhtmltopdf
    apt-get update && \
    apt-get install -y --no-install-recommends ./wkhtmltox.deb && \
    # Cleanup
    rm -f wkhtmltox.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy uv binary from official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Configure uv and Python virtual environment
ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never \
    UV_PROJECT_ENVIRONMENT=/workspace/.venv \
    PATH="/workspace/.venv/bin:$PATH"

# User configuration arguments
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=1000
ARG HOME_USER=/home/$USERNAME
ARG ODOO_DATA=/var/lib/odoo

# Create odoo user and configure directories
RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} --create-home --home-dir ${HOME_USER} --shell /bin/zsh ${USERNAME} \
    && echo "${USERNAME} ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
    && mkdir -p ${ODOO_DATA} /commandhistory /workspace \
    && touch /commandhistory/.zsh_history \
    && chmod -R 755 ${ODOO_DATA} /commandhistory /workspace \
    && chown -R ${USERNAME}:${USERNAME} ${ODOO_DATA} /commandhistory /workspace

USER $USERNAME
WORKDIR $HOME_USER

# Instalar Oh My Zsh y plugins en una sola capa
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && git clone https://github.com/zsh-users/zsh-completions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions \
    &&git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search \
    && sed -i 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting zsh-completions sudo uv zsh-history-substring-search)/' ~/.zshrc \
    && SNIPPET="autoload -Uz add-zsh-hook; append_history() { fc -W }; add-zsh-hook precmd append_history; export HISTFILE=/commandhistory/.zsh_history" \
    && echo "$SNIPPET" >> "$HOME_USER/.zshrc" \
    && git config --global --add safe.directory '*'

# Exponer volumen para datos persistentes de Odoo
VOLUME ["$ODOO_DATA"]

# Establecer el directorio de trabajo
WORKDIR /workspace

