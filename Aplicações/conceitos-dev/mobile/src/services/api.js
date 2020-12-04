import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.167:3333'
})

export default api

/*

* iOS com Emulador: localhost
* iOS com físico: IP da máquina

* Android com Emulador: localhost (adb reverse tcp:3333 tcp:3333)
----------------------------- Esse comando quer dizer que a porta 3333 do Windows é a mesma do Android

* Android com Emulador: IP 10.0.2.2 (Android Studio)
* Android com Emulador: IP 10.0.3.2 (Genymotion)
* Android com físico: IP da máquina (ipconfig) -- Endereço IPv4

*/