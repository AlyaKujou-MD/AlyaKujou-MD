# Instalación del Bot en Termux 📱

Guía paso a paso para instalar y ejecutar el bot de WhatsApp en Termux.

## 📋 Requisitos previos

- Termux instalado en tu dispositivo Android
- Conexión a Internet
- Aproximadamente 500 MB de almacenamiento libre

## 🔧 Instalación

### Paso 1: Actualizar Termux

```bash
pkg update && pkg upgrade -y
```

### Paso 2: Instalar Node.js y Git

```bash
pkg install nodejs git -y
```

Verifica que se instaló correctamente:

```bash
node -v
npm -v
git --version
```

### Paso 3: Clonar el repositorio

```bash
cd $HOME
git clone https://github.com/AlyaKujou-MD/AlyaKujou-MD.git
cd AlyaKujou-MD
```

### Paso 4: Instalar dependencias

```bash
npm install
```

Esto puede tomar de 5-10 minutos dependiendo de tu conexión.

### Paso 5: Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` según necesites:

```bash
nano .env
```

Presiona `Ctrl + X` para salir y guardar.

### Paso 6: Ejecutar el bot

```bash
npm start
```

## ✅ Escanear código QR

1. Cuando ejecutes `npm start`, aparecerá un código QR en la terminal
2. Abre WhatsApp en tu teléfono
3. Ve a **Configuración** → **Dispositivos vinculados**
4. Toca **Vincular un dispositivo**
5. Escanea el código QR que aparece en Termux

## 🔄 Mantener el bot activo

### Opción 1: Usar `nohup` (recomendado)

```bash
nohup npm start &
```

Para detener el bot:

```bash
pkill -f "node index.js"
```

### Opción 2: Usar tmux (sesiones persistentes)

```bash
pkg install tmux -y
tmux new-session -d -s bot "cd $HOME/AlyaKujou-MD && npm start"
```

Para ver la sesión:

```bash
tmux attach-session -t bot
```

Para detener la sesión:

```bash
tmux kill-session -t bot
```

### Opción 3: Crear un script de inicio automático

Crea un archivo `start-bot.sh`:

```bash
nano start-bot.sh
```

Agrega:

```bash
#!/bin/bash
cd $HOME/AlyaKujou-MD
npm start
```

Da permisos de ejecución:

```bash
chmod +x start-bot.sh
```

Ejecuta:

```bash
./start-bot.sh
```

## 📊 Monitoreo

### Ver procesos de Node.js activos

```bash
ps aux | grep node
```

### Ver uso de memoria y CPU

```bash
top
```

Presiona `q` para salir.

## 🐛 Solución de problemas

### El QR no aparece

```bash
# Limpia la carpeta de autenticación
rm -rf auth_info_baileys/
npm start
```

### Error de permisos

```bash
chmod -R 755 .
```

### Memoria insuficiente

```bash
# Aumenta el espacio de swap
pkg install libffi -y
```

### Node.js se detiene

Intenta usar una versión específica:

```bash
pkg install nodejs@16 -y
```

## 📝 Comandos útiles

```bash
# Actualizar el bot desde GitHub
cd $HOME/AlyaKujou-MD
git pull
npm install

# Ver logs del bot
tail -f nohup.out

# Reiniciar el bot
pkill -f "node index.js"
sleep 2
nohup npm start &
```

## 💡 Tips

- Mantén tu teléfono conectado a Internet mientras el bot esté activo
- No cierres la sesión de WhatsApp Web en otros dispositivos
- Si el bot se desconecta, reinicia con `npm start`
- Usa tmux para sesiones más estables

## 🆘 Soporte

Si tienes problemas:

1. Verifica que Node.js esté correctamente instalado
2. Intenta limpiar caché: `npm cache clean --force`
3. Reinstala dependencias: `rm -rf node_modules && npm install`
4. Consulta los logs para más información

---

¡Tu bot debería estar corriendo ahora! 🚀