# AlyaKujou WhatsApp Bot 🤖

Bot de WhatsApp basado en Baileys con funcionalidades personalizables.

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Comandos](#comandos-disponibles)
- [Estructura](#estructura-del-proyecto)
- [Instalación en Termux](#instalación-en-termux)

## 📦 Instalación

### Requisitos
- Node.js v14 o superior
- npm o yarn

```bash
npm install
```

## 🚀 Uso

```bash
npm start
```

Para desarrollo con recarga automática:

```bash
npm run dev
```

**Primeros pasos:**
1. Ejecuta `npm start`
2. Escanea el código QR con WhatsApp
3. El bot estará listo para recibir comandos

## 💬 Comandos disponibles

Ver la lista completa en [menu/menu.js](menu/menu.js)

## 📁 Estructura del proyecto

```
.
├── index.js                  # Archivo principal
├── package.json              # Dependencias
├── .env.example              # Template de variables
├── .gitignore                # Archivos ignorados
├── README.md                 # Este archivo
├── TERMUX.md                 # Guía de instalación en Termux
├── menu/
│   └── menu.js              # Sistema de menú y comandos
└── auth_info_baileys/        # Credenciales (generadas automáticamente)
```

## ⚙️ Configuración

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tus configuraciones:

```env
BOT_NAME=AlyaKujou
BOT_PREFIX=!
DEBUG=false
```

## 📱 Instalación en Termux

Para instalación detallada en Termux, consulta [TERMUX.md](TERMUX.md)

## 📄 Licencia

MIT