var A=a=>{throw TypeError(a)};var P=(a,e,t)=>e.has(a)||A("Cannot "+t);var l=(a,e,t)=>(P(a,e,"read from private field"),t?t.call(a):e.get(a)),y=(a,e,t)=>e.has(a)?A("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,t),T=(a,e,t,r)=>(P(a,e,"write to private field"),r?r.call(a,t):e.set(a,t),t),E=(a,e,t)=>(P(a,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class R{getTemplate(){return`
      <section class="animate-in fade-in duration-700">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div class="space-y-1">
            <h1 class="text-4xl font-black text-gray-900 tracking-tight">Dashboard Story</h1>
            <p class="text-gray-500 font-medium">Jelajahi cerita dari berbagai lokasi di Indonesia.</p>
          </div>
          <div class="flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl font-bold text-sm border border-blue-100 shadow-sm">
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            📍 Lokasi Terdeteksi
          </div>
        </div>
        
        <div id="map" class="w-full h-[500px] rounded-[2rem] shadow-2xl border-8 border-white mb-16 relative z-0 overflow-hidden group" role="application" aria-label="Peta interaktif yang menunjukkan lokasi cerita">
           <div class="absolute inset-0 bg-gray-100 flex items-center justify-center -z-10">
             <p class="text-gray-400 font-bold animate-pulse">Memuat Peta...</p>
           </div>
        </div>
        
        <div class="flex items-center gap-4 mb-10">
          <h2 class="text-2xl font-black text-gray-900">Cerita Terbaru</h2>
          <div class="h-1 flex-grow bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full w-24 bg-blue-500 rounded-full"></div>
          </div>
        </div>
        
        <div id="data-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="col-span-full flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-400 font-bold tracking-widest uppercase text-xs">Mengambil Data Cerita</p>
          </div>
        </div>
      </section>
    `}showData(e,t){const r=document.querySelector("#data-list");if(!e||e.length===0){r.innerHTML=`
        <div class="col-span-full text-center py-24 bg-white rounded-[2rem] border-4 border-dashed border-gray-100">
          <div class="text-6xl mb-6">📭</div>
          <p class="text-2xl text-gray-400 font-black italic">Belum ada cerita di sini.</p>
          <p class="text-gray-400 mt-2 font-medium">Jadilah yang pertama untuk berbagi!</p>
        </div>
      `;return}r.innerHTML=e.map(n=>`
      <div class="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-3 card-story" 
        data-id="${n.id}" 
        tabindex="0" 
        role="button" 
        aria-label="Cerita oleh ${n.name}, klik untuk lihat detail">
        <div class="relative h-72 overflow-hidden">
          <img src="${n.photoUrl}" alt="Foto cerita oleh ${n.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <a href="#/detail/${n.id}" class="text-white font-bold text-xs bg-blue-600/90 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">Lihat Detail Cerita</a>
            </div>
          </div>
        </div>
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">${n.name}</h3>
            <div class="flex gap-2">
              <button class="btn-favorite p-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm" data-id="${n.id}" title="Tambah ke Favorit">
                🤍
              </button>
              ${n.lat&&n.lon?`
                <button class="btn-locate p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm" data-id="${n.id}" title="Lihat di Peta">
                  📍
                </button>
              `:""}
            </div>
          </div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg" aria-hidden="true">👤</div>
            <div>
               <p class="text-xs font-black text-gray-400 uppercase tracking-widest">${new Date(n.createdAt).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}</p>
            </div>
          </div>
          <p class="text-gray-500 line-clamp-3 leading-relaxed font-medium text-lg">${n.description}</p>
        </div>
      </div>
    `).join("");const i=n=>{window.location.hash=`#/detail/${n}`},s=(n,c)=>{n.stopPropagation(),t(c)},o=async(n,c)=>{n.stopPropagation();const _=n.currentTarget,S=_.innerText==="❤️";this._onFavoriteClick(c,S,_)};r.querySelectorAll(".card-story").forEach((n,c)=>{n.addEventListener("click",()=>i(n.dataset.id)),n.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),i(n.dataset.id))});const _=n.querySelector(".btn-locate");_&&_.addEventListener("click",g=>s(g,n.dataset.id));const S=n.querySelector(".btn-favorite");S&&(this._checkFavorite(n.dataset.id,S),S.addEventListener("click",g=>o(g,e[c])))})}async _checkFavorite(e,t){if(this.onCheckFavorite){const r=await this.onCheckFavorite(e);t.innerText=r?"❤️":"🤍"}}setFavoriteCallbacks({onFavoriteClick:e,onCheckFavorite:t}){this._onFavoriteClick=e,this.onCheckFavorite=t}showError(e){const t=document.querySelector("#data-list");t&&(t.innerHTML=`
        <div class="col-span-full text-center py-24">
          <p class="text-red-500 font-bold">${e}</p>
        </div>
      `)}}const q="story-app-db",$=1,p="favorites",b="outbox",m=()=>new Promise((a,e)=>{const t=indexedDB.open(q,$);t.onerror=()=>e(t.error),t.onsuccess=()=>a(t.result),t.onupgradeneeded=r=>{const i=r.target.result;i.objectStoreNames.contains(p)||i.createObjectStore(p,{keyPath:"id"}),i.objectStoreNames.contains(b)||i.createObjectStore(b,{autoIncrement:!0})}}),v={async getAllFavorites(){const a=await m();return new Promise((e,t)=>{const s=a.transaction(p,"readonly").objectStore(p).getAll();s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error)})},async getFavorite(a){const e=await m();return new Promise((t,r)=>{const o=e.transaction(p,"readonly").objectStore(p).get(a);o.onsuccess=()=>t(o.result),o.onerror=()=>r(o.error)})},async putFavorite(a){const e=await m();return new Promise((t,r)=>{const o=e.transaction(p,"readwrite").objectStore(p).put(a);o.onsuccess=()=>t(o.result),o.onerror=()=>r(o.error)})},async deleteFavorite(a){const e=await m();return new Promise((t,r)=>{const o=e.transaction(p,"readwrite").objectStore(p).delete(a);o.onsuccess=()=>t(o.result),o.onerror=()=>r(o.error)})},async addToOutbox(a){const e=await m();return new Promise((t,r)=>{const o=e.transaction(b,"readwrite").objectStore(b).add(a);o.onsuccess=()=>t(o.result),o.onerror=()=>r(o.error)})},async getAllFromOutbox(){const a=await m();return new Promise((e,t)=>{const s=a.transaction(b,"readonly").objectStore(b).openCursor(),o=[];s.onsuccess=n=>{const c=n.target.result;c?(o.push({key:c.key,value:c.value}),c.continue()):e(o)},s.onerror=()=>t(s.error)})},async deleteFromOutbox(a){const e=await m();return new Promise((t,r)=>{const o=e.transaction(b,"readwrite").objectStore(b).delete(a);o.onsuccess=()=>t(o.result),o.onerror=()=>r(o.error)})}};class B{constructor({view:e,model:t}){this._view=e,this._model=t,this._map=null,this._markers={},this._initialize()}async _initialize(){this._view.setFavoriteCallbacks({onFavoriteClick:(e,t,r)=>this._onFavoriteClick(e,t,r),onCheckFavorite:e=>this._onCheckFavorite(e)});try{const t=(await this._model.getData()).listStory||[];this._view.showData(t,r=>this._onStoryClick(r)),this._initMap(t)}catch(e){console.error("Failed to fetch stories:",e),this._view.showError("Gagal memuat cerita. Pastikan Anda sudah login.")}}async _onFavoriteClick(e,t,r){t?(await v.deleteFavorite(e.id),r.innerText="🤍"):(await v.putFavorite(e),r.innerText="❤️")}async _onCheckFavorite(e){return!!await v.getFavorite(e)}_initMap(e){const t=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}),r=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community"});this._map=L.map("map",{center:[-2.5489,118.0149],zoom:5,layers:[t]});const i={OpenStreetMap:t,Satellite:r};L.control.layers(i).addTo(this._map),e.forEach(s=>{if(s.lat!==null&&s.lon!==null){const o=L.marker([s.lat,s.lon]).addTo(this._map);o.bindPopup(`
          <div class="map-popup">
            <img src="${s.photoUrl}" alt="Foto cerita oleh ${s.name}" style="width:100%; border-radius:4px;">
            <h4>${s.name}</h4>
            <p>${s.description.substring(0,50)}...</p>
          </div>
        `),this._markers[s.id]=o}})}_onStoryClick(e){const t=this._markers[e];t?(this._map.flyTo(t.getLatLng(),12),t.openPopup()):alert("Lokasi tidak tersedia untuk cerita ini.")}}const x={BASE_URL:"https://story-api.dicoding.dev/v1",PUSH_MSG_VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"},w={REGISTER:`${x.BASE_URL}/register`,LOGIN:`${x.BASE_URL}/login`,STORIES:`${x.BASE_URL}/stories`,NOTIFICATIONS_SUBSCRIBE:`${x.BASE_URL}/notifications/subscribe`,NOTIFICATIONS_UNSUBSCRIBE:`${x.BASE_URL}/notifications/unsubscribe`};async function N({name:a,email:e,password:t}){return await(await fetch(w.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a,email:e,password:t})})).json()}async function U({email:a,password:e}){return await(await fetch(w.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a,password:e})})).json()}async function H({description:a,photo:e,lat:t,lon:r}){const i=localStorage.getItem("user_token"),s=new FormData;return s.append("description",a),s.append("photo",e),t&&s.append("lat",t),r&&s.append("lon",r),await(await fetch(w.STORIES,{method:"POST",headers:{Authorization:`Bearer ${i}`},body:s})).json()}async function z(){const a=localStorage.getItem("user_token");return await(await fetch(`${w.STORIES}?location=1`,{headers:{Authorization:`Bearer ${a}`}})).json()}async function G(a){const e=localStorage.getItem("user_token");return await(await fetch(`${w.STORIES}/${a}`,{headers:{Authorization:`Bearer ${e}`}})).json()}async function V(a){const e=localStorage.getItem("user_token");return await(await fetch(w.NOTIFICATIONS_SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(a)})).json()}async function W(a){const e=localStorage.getItem("user_token");return await(await fetch(w.NOTIFICATIONS_UNSUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({endpoint:a})})).json()}class K{constructor(){this._view=new R}async render(){return this._view.getTemplate()}async afterRender(){new B({view:this._view,model:{getData:z}})}}class J{async render(){return`
      <section class="container animate-in fade-in duration-700">
        <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-6">Tentang StoryApp</h1>
        <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <p class="text-gray-600 text-lg leading-relaxed">
            StoryApp adalah platform untuk berbagi cerita dan momen spesial Anda dengan orang lain di seluruh penjuru negeri.
          </p>
        </div>
      </section>
    `}async afterRender(){}}class Y{getTemplate(){return`
      <section class="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
          <div class="text-center mb-10">
            <h1 class="text-3xl font-black text-gray-900 mb-2">Buat Akun</h1>
            <p class="text-gray-500 font-medium">Mulai berbagi ceritamu hari ini!</p>
          </div>
          <form id="register-form" class="space-y-6">
            <div class="space-y-2">
              <label for="name" class="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Nama Lengkap</label>
              <input type="text" id="name" name="name" required 
                class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium" 
                placeholder="Masukkan nama Anda">
            </div>
            <div class="space-y-2">
              <label for="email" class="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email</label>
              <input type="email" id="email" name="email" required 
                class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium" 
                placeholder="nama@email.com">
            </div>
            <div class="space-y-2">
              <label for="password" class="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Password</label>
              <input type="password" id="password" name="password" required minlength="8"
                class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium" 
                placeholder="Minimal 8 karakter">
            </div>
            <button type="submit" 
              class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-blue-200 transform hover:-translate-y-1 transition-all duration-300">
              Daftar Sekarang
            </button>
          </form>
          <div class="mt-10 text-center">
            <p class="text-gray-600 font-medium">Sudah punya akun? 
              <a href="#/login" class="text-blue-600 font-bold hover:underline ml-1">Masuk di sini</a>
            </p>
          </div>
        </div>
      </section>
    `}bindRegister(e){const t=document.querySelector("#register-form");t.addEventListener("submit",r=>{r.preventDefault();const i=new FormData(t),s=Object.fromEntries(i.entries());e(s)})}showMessage(e,t=!1){alert(e)}}class X{constructor({view:e,model:t}){this._view=e,this._model=t,this._view.bindRegister(this._handleRegister.bind(this))}async _handleRegister(e){try{const t=await this._model.postRegister(e);t.error?this._view.showMessage(t.message,!0):(this._view.showMessage("Registrasi berhasil! Silakan login."),window.location.hash="#/login")}catch(t){console.error("Registration failed:",t),this._view.showMessage("Terjadi kesalahan saat registrasi.",!0)}}}class Q{constructor(){this._view=new Y}async render(){return this._view.getTemplate()}async afterRender(){new X({view:this._view,model:{postRegister:N}})}}class Z{getTemplate(){return`
      <section class="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
          <div class="text-center mb-10">
            <h1 class="text-3xl font-black text-gray-900 mb-2">Selamat Datang</h1>
            <p class="text-gray-500 font-medium">Masuk untuk melihat cerita seru!</p>
          </div>
          <form id="login-form" class="space-y-6">
            <div class="space-y-2">
              <label for="email" class="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email</label>
              <input type="email" id="email" name="email" required 
                class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium" 
                placeholder="nama@email.com">
            </div>
            <div class="space-y-2">
              <label for="password" class="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Password</label>
              <input type="password" id="password" name="password" required 
                class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium" 
                placeholder="••••••••">
            </div>
            <button type="submit" 
              class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-blue-200 transform hover:-translate-y-1 transition-all duration-300">
              Masuk Sekarang
            </button>
          </form>
          <div class="mt-10 text-center">
            <p class="text-gray-600 font-medium">Belum punya akun? 
              <a href="#/register" class="text-blue-600 font-bold hover:underline ml-1">Daftar di sini</a>
            </p>
          </div>
        </div>
      </section>
    `}bindLogin(e){const t=document.querySelector("#login-form");t.addEventListener("submit",r=>{r.preventDefault();const i=new FormData(t),s=Object.fromEntries(i.entries());e(s)})}showMessage(e,t=!1){alert(e)}}class ee{constructor({view:e,model:t}){this._view=e,this._model=t,this._view.bindLogin(this._handleLogin.bind(this))}async _handleLogin(e){try{const t=await this._model.postLogin(e);t.error?this._view.showMessage(t.message,!0):(localStorage.setItem("user_token",t.loginResult.token),this._view.showMessage("Login berhasil!"),window.location.hash="#/")}catch(t){console.error("Login failed:",t),this._view.showMessage("Terjadi kesalahan saat login.",!0)}}}class te{constructor(){this._view=new Z}async render(){return this._view.getTemplate()}async afterRender(){new ee({view:this._view,model:{postLogin:U}})}}class ae{getTemplate(){return`
      <section class="animate-in fade-in duration-700">
        <div class="mb-10">
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Tambah Cerita Baru</h1>
          <p class="text-gray-500 font-medium mt-2">Bagikan momen serumu dengan dunia.</p>
        </div>

        <form id="add-story-form" class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div class="space-y-8">
            <div class="space-y-4">
              <label for="description" class="text-lg font-black text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">1</span>
                Ceritakan momenmu
              </label>
              <textarea id="description" name="description" required rows="5"
                class="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[2rem] focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium shadow-sm"
                placeholder="Tulis deskripsi cerita di sini..."></textarea>
            </div>

            <div class="space-y-4">
              <label class="text-lg font-black text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">2</span>
                Tambahkan Foto
              </label>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="relative group">
                  <input type="file" id="photo" name="photo" accept="image/*" class="hidden">
                  <label for="photo" class="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-gray-100 rounded-[2rem] cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300" aria-label="Pilih foto dari galeri">
                    <span class="text-4xl mb-2" aria-hidden="true">🖼️</span>
                    <span class="font-bold text-gray-500">Pilih Galeri</span>
                  </label>
                </div>

                <div id="camera-section" class="relative group">
                   <button type="button" id="btn-open-camera" class="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-gray-100 rounded-[2rem] cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300" aria-label="Gunakan kamera untuk mengambil foto">
                    <span class="text-4xl mb-2" aria-hidden="true">📸</span>
                    <span class="font-bold text-gray-500">Gunakan Kamera</span>
                  </button>
                  <div id="camera-ui" class="hidden absolute inset-0 z-10 bg-black rounded-[2rem] overflow-hidden flex flex-col">
                    <video id="video" class="w-full h-full object-cover" autoplay playsinline aria-label="Pratinjau kamera"></video>
                    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <button type="button" id="btn-capture" class="w-12 h-12 bg-white rounded-full border-4 border-gray-300 shadow-lg active:scale-90 transition-transform" aria-label="Ambil foto"></button>
                      <button type="button" id="btn-close-camera" class="absolute right-4 bottom-2 text-white font-bold bg-red-600/80 px-4 py-2 rounded-xl text-xs backdrop-blur-sm" aria-label="Tutup kamera">Tutup</button>
                    </div>
                  </div>
                </div>
              </div>

              <div id="image-preview" class="hidden relative rounded-[2rem] overflow-hidden border-8 border-white shadow-xl aspect-video bg-gray-50">
                <img id="preview-img" class="w-full h-full object-cover" src="" alt="Pratinjau foto yang dipilih">
                <button type="button" id="btn-remove-photo" class="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors" aria-label="Hapus foto">✕</button>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div class="space-y-4">
              <label class="text-lg font-black text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">3</span>
                Pilih Lokasi
              </label>
              <p class="text-sm text-gray-500 font-medium">Klik pada peta untuk menandai lokasi ceritamu.</p>
              
              <div id="map-add" class="w-full h-[400px] rounded-[2rem] shadow-xl border-8 border-white z-0" role="application" aria-label="Peta interaktif untuk memilih lokasi"></div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="lat" class="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Latitude</label>
                  <input type="text" id="lat" name="lat" readonly
                    class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-gray-600 outline-none" placeholder="-">
                </div>
                <div class="space-y-2">
                  <label for="lon" class="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Longitude</label>
                  <input type="text" id="lon" name="lon" readonly
                    class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-gray-600 outline-none" placeholder="-">
                </div>
              </div>
            </div>

            <button type="submit" id="btn-submit"
              class="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-blue-200 transform hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Posting Cerita Sekarang
            </button>
          </div>
        </form>
      </section>
    `}bindAddStory(e){const t=document.querySelector("#add-story-form");t.addEventListener("submit",r=>{r.preventDefault();const i=new FormData(t);e(i)})}showPreview(e){const t=document.querySelector("#image-preview"),r=document.querySelector("#preview-img");if(e){const i=new FileReader;i.onload=s=>{r.src=s.target.result,t.classList.remove("hidden")},i.readAsDataURL(e)}else t.classList.add("hidden"),r.src=""}showMessage(e,t=!1){alert(e)}setLoading(e){const t=document.querySelector("#btn-submit");e?(t.disabled=!0,t.innerHTML=`
        <div class="flex items-center justify-center gap-3">
          <div class="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          Memposting...
        </div>
      `):(t.disabled=!1,t.innerText="Posting Cerita Sekarang")}}class re{constructor({view:e,model:t}){this._view=e,this._model=t,this._map=null,this._marker=null,this._stream=null,this._capturedFile=null,this._initialize()}_initialize(){this._initMap(),this._view.bindAddStory(this._handleSubmit.bind(this)),this._setupFileListeners(),this._setupCameraListeners()}_initMap(){this._map=L.map("map-add").setView([-2.5489,118.0149],5),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(this._map),this._map.on("click",e=>{const{lat:t,lng:r}=e.latlng;this._updateLocation(t,r)})}_updateLocation(e,t){this._marker?this._marker.setLatLng([e,t]):this._marker=L.marker([e,t]).addTo(this._map),document.querySelector("#lat").value=e.toFixed(6),document.querySelector("#lon").value=t.toFixed(6)}_setupFileListeners(){const e=document.querySelector("#photo");e.addEventListener("change",r=>{const i=r.target.files[0];i&&(this._capturedFile=i,this._view.showPreview(i))}),document.querySelector("#btn-remove-photo").addEventListener("click",()=>{this._capturedFile=null,e.value="",this._view.showPreview(null)})}async _setupCameraListeners(){const e=document.querySelector("#btn-open-camera"),t=document.querySelector("#btn-close-camera"),r=document.querySelector("#btn-capture"),i=document.querySelector("#camera-ui"),s=document.querySelector("#video");e.addEventListener("click",async()=>{try{this._stream=await navigator.mediaDevices.getUserMedia({video:!0}),s.srcObject=this._stream,i.classList.remove("hidden")}catch(o){console.error("Error accessing camera:",o),this._view.showMessage("Tidak dapat mengakses kamera.",!0)}}),t.addEventListener("click",()=>{this._stopCamera(),i.classList.add("hidden")}),r.addEventListener("click",()=>{const o=document.createElement("canvas");o.width=s.videoWidth,o.height=s.videoHeight,o.getContext("2d").drawImage(s,0,0),o.toBlob(n=>{const c=new File([n],"captured_image.jpg",{type:"image/jpeg"});this._capturedFile=c,this._view.showPreview(c),this._stopCamera(),i.classList.add("hidden")},"image/jpeg")})}_stopCamera(){this._stream&&(this._stream.getTracks().forEach(e=>e.stop()),this._stream=null)}async _handleSubmit(e){const t=e.get("description"),r=e.get("lat"),i=e.get("lon"),s=this._capturedFile;if(!t){this._view.showMessage("Deskripsi harus diisi.",!0);return}if(!s){this._view.showMessage("Foto harus diunggah atau diambil via kamera.",!0);return}const o={description:t,photo:s,lat:r?parseFloat(r):null,lon:i?parseFloat(i):null,token:localStorage.getItem("user_token")};if(!navigator.onLine&&"serviceWorker"in navigator&&"SyncManager"in window){try{this._view.setLoading(!0),await v.addToOutbox(o),await(await navigator.serviceWorker.ready).sync.register("sync-stories"),this._view.showMessage("Offline: Cerita disimpan dan akan dikirim saat Anda online kembali."),setTimeout(()=>{window.location.hash="#/"},2e3)}catch(n){console.error("Failed to register sync:",n),this._view.showMessage("Gagal menyimpan cerita offline.",!0)}finally{this._view.setLoading(!1)}return}try{this._view.setLoading(!0);const n=await this._model.postStory(o);n.error?this._view.showMessage(n.message,!0):(this._view.showMessage("Cerita berhasil diposting!"),window.location.hash="#/")}catch(n){console.error("Failed to post story:",n),this._view.showMessage("Terjadi kesalahan saat memposting cerita. Mencoba simpan offline..."),"serviceWorker"in navigator&&"SyncManager"in window&&(await v.addToOutbox(o),await(await navigator.serviceWorker.ready).sync.register("sync-stories"))}finally{this._view.setLoading(!1)}}}class ie{constructor(){this._view=new ae}async render(){return this._view.getTemplate()}async afterRender(){new re({view:this._view,model:{postStory:H}})}}class se{getTemplate(){return`
      <section class="animate-in fade-in duration-700 max-w-4xl mx-auto">
        <div class="mb-10">
          <a href="#/" class="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline mb-6">
            ← Kembali ke Beranda
          </a>
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Detail Cerita</h1>
        </div>

        <div id="detail-content" class="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
          <div class="flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-400 font-bold tracking-widest uppercase text-xs">Memuat Detail Cerita</p>
          </div>
        </div>
      </section>
    `}showDetail(e){const t=document.querySelector("#detail-content");t.innerHTML=`
      <div class="relative h-[500px] overflow-hidden">
        <img src="${e.photoUrl}" alt="Foto cerita oleh ${e.name}" class="w-full h-full object-cover">
      </div>
      <div class="p-10">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 class="text-3xl font-black text-gray-900 mb-2">${e.name}</h2>
            <p class="text-sm font-black text-gray-400 uppercase tracking-widest">
              ${new Date(e.createdAt).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}
            </p>
          </div>
          ${e.lat&&e.lon?`
            <div class="bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl font-bold text-sm border border-blue-100 flex items-center gap-2">
              📍 ${e.lat.toFixed(4)}, ${e.lon.toFixed(4)}
            </div>
          `:""}
        </div>
        <div class="prose max-w-none">
          <p class="text-xl text-gray-600 leading-relaxed font-medium whitespace-pre-wrap">${e.description}</p>
        </div>
      </div>
    `}showError(e){const t=document.querySelector("#detail-content");t.innerHTML=`
      <div class="p-20 text-center">
        <div class="text-6xl mb-6">⚠️</div>
        <p class="text-xl text-red-500 font-bold">${e}</p>
        <a href="#/" class="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">Kembali ke Beranda</a>
      </div>
    `}}class oe{constructor({view:e,id:t}){this._view=e,this._id=t,this._initialize()}async _initialize(){try{const e=await G(this._id);if(e.error)throw new Error(e.message);this._view.showDetail(e.story)}catch(e){console.error("Failed to fetch story detail:",e),this._view.showError("Gagal memuat detail cerita.")}}}function C(a){const e=a.split("/");return{resource:e[1]||null,id:e[2]||null}}function ne(a){let e="";return a.resource&&(e=e.concat(`/${a.resource}`)),a.id&&(e=e.concat("/:id")),e||"/"}function j(){return location.hash.replace("#","")||"/"}function le(){const a=j(),e=C(a);return ne(e)}function ce(){const a=j();return C(a)}class de{constructor(){this._view=new se}async render(){return this._view.getTemplate()}async afterRender(){const{id:e}=ce();new oe({view:this._view,id:e})}}class ue{getTemplate(){return`
      <section class="animate-in fade-in duration-700">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div class="space-y-1">
            <h1 class="text-4xl font-black text-gray-900 tracking-tight">Cerita Favorit</h1>
            <p class="text-gray-500 font-medium">Koleksi cerita yang Anda simpan secara lokal.</p>
          </div>
          <div class="relative w-full md:w-80">
            <input type="text" id="search-favorite" placeholder="Cari cerita favorit..." class="w-full px-6 py-3 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium">
            <span class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        
        <div id="favorite-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="col-span-full flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-400 font-bold tracking-widest uppercase text-xs">Mengambil Data Favorit</p>
          </div>
        </div>
      </section>
    `}showData(e,t){const r=document.querySelector("#favorite-list");if(!e||e.length===0){r.innerHTML=`
        <div class="col-span-full text-center py-24 bg-white rounded-[2rem] border-4 border-dashed border-gray-100">
          <div class="text-6xl mb-6">💖</div>
          <p class="text-2xl text-gray-400 font-black italic">Belum ada cerita favorit.</p>
          <p class="text-gray-400 mt-2 font-medium">Klik ikon hati pada cerita untuk menyimpannya di sini.</p>
        </div>
      `;return}r.innerHTML=e.map(i=>`
      <div class="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-3 card-story" 
        data-id="${i.id}" 
        tabindex="0" 
        role="button">
        <div class="relative h-72 overflow-hidden">
          <img src="${i.photoUrl}" alt="Foto cerita oleh ${i.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <a href="#/detail/${i.id}" class="text-white font-bold text-xs bg-blue-600/90 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">Lihat Detail Cerita</a>
          </div>
        </div>
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">${i.name}</h3>
            <button class="btn-remove-favorite p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-all shadow-sm" data-id="${i.id}" title="Hapus dari Favorit">
              ❤️
            </button>
          </div>
          <p class="text-gray-500 line-clamp-3 leading-relaxed font-medium text-lg">${i.description}</p>
        </div>
      </div>
    `).join(""),r.querySelectorAll(".btn-remove-favorite").forEach(i=>{i.addEventListener("click",s=>{s.stopPropagation(),t(i.dataset.id)})}),r.querySelectorAll(".card-story").forEach(i=>{i.addEventListener("click",()=>{window.location.hash=`#/detail/${i.dataset.id}`})})}bindSearch(e){document.querySelector("#search-favorite").addEventListener("input",r=>{e(r.target.value)})}}class pe{constructor({view:e}){this._view=e,this._stories=[],this._initialize()}async _initialize(){this._stories=await v.getAllFavorites(),this._view.showData(this._stories,e=>this._onRemoveFavorite(e)),this._view.bindSearch(e=>this._onSearch(e))}async _onRemoveFavorite(e){await v.deleteFavorite(e),this._stories=this._stories.filter(t=>t.id!==e),this._view.showData(this._stories,t=>this._onRemoveFavorite(t))}_onSearch(e){const t=this._stories.filter(r=>r.name.toLowerCase().includes(e.toLowerCase())||r.description.toLowerCase().includes(e.toLowerCase()));this._view.showData(t,r=>this._onRemoveFavorite(r))}}class he{constructor(){this._view=new ue}async render(){return this._view.getTemplate()}async afterRender(){new pe({view:this._view})}}const be={"/":new K,"/about":new J,"/register":new Q,"/login":new te,"/add":new ie,"/detail/:id":new de,"/favorite":new he},F={async sendSubscriptionToServer(a){try{const e=await V(a);console.log("Successfully subscribed to push notifications:",e)}catch(e){console.error("Failed to subscribe to push notifications:",e)}},async sendUnsubscriptionToServer(a){try{const e=await W(a);console.log("Successfully unsubscribed from push notifications:",e)}catch(e){console.error("Failed to unsubscribe from push notifications:",e)}},async isSubscribed(){return!!await(await navigator.serviceWorker.ready).pushManager.getSubscription()},async subscribe(){try{const e=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this._urlBase64ToUint8Array(x.PUSH_MSG_VAPID_PUBLIC_KEY)});return await this.sendSubscriptionToServer(e),!0}catch(a){return console.error("Could not subscribe to push notifications",a),!1}},async unsubscribe(){const e=await(await navigator.serviceWorker.ready).pushManager.getSubscription();return e?(await e.unsubscribe(),await this.sendUnsubscriptionToServer(e.endpoint),!0):!1},_urlBase64ToUint8Array(a){const e="=".repeat((4-a.length%4)%4),t=(a+e).replace(/-/g,"+").replace(/_/g,"/"),r=window.atob(t),i=new Uint8Array(r.length);for(let s=0;s<r.length;++s)i[s]=r.charCodeAt(s);return i}};var f,u,d,k,h,D,M,I,O;class ge{constructor({navigationDrawer:e,drawerButton:t,content:r,header:i}){y(this,h);y(this,f,null);y(this,u,null);y(this,d,null);y(this,k,null);T(this,f,r),T(this,u,t),T(this,d,e),T(this,k,i),E(this,h,D).call(this)}async renderPage(){const e=le(),t=be[e];E(this,h,O).call(this,e),await E(this,h,M).call(this);const r=async()=>{l(this,f).innerHTML=await t.render(),await t.afterRender()};if(!document.startViewTransition){await r();return}document.startViewTransition(()=>r())}}f=new WeakMap,u=new WeakMap,d=new WeakMap,k=new WeakMap,h=new WeakSet,D=function(){const e=document.querySelector(".skip-to-content");e&&e.addEventListener("click",t=>{t.preventDefault(),l(this,f).setAttribute("tabindex","-1"),l(this,f).focus(),window.scrollTo(0,0)}),l(this,u).addEventListener("click",()=>{l(this,d).classList.toggle("open");const t=l(this,d).classList.contains("open");l(this,u).setAttribute("aria-expanded",t)}),document.body.addEventListener("click",t=>{!l(this,d).contains(t.target)&&!l(this,u).contains(t.target)&&l(this,d).classList.contains("open")&&(l(this,d).classList.remove("open"),l(this,u).setAttribute("aria-expanded","false")),l(this,d).querySelectorAll("a, button").forEach(r=>{if(r.contains(t.target)){if(r.id==="notification-toggle")return;l(this,d).classList.remove("open"),l(this,u).setAttribute("aria-expanded","false")}})}),window.addEventListener("keydown",t=>{t.key==="Escape"&&l(this,d).classList.contains("open")&&(l(this,d).classList.remove("open"),l(this,u).setAttribute("aria-expanded","false"),l(this,u).focus())})},M=async function(){const e=document.querySelector("#nav-list"),t=localStorage.getItem("user_token"),r=`
      <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/">Beranda</a></li>
      <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/favorite">Favorit</a></li>
      <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/about">About</a></li>
    `;if(t){const i=await F.isSubscribed();e.innerHTML=`
        ${r}
        <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/add">Tambah Cerita</a></li>
        <li>
          <button id="notification-toggle" class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all flex items-center gap-2 w-full lg:w-auto cursor-pointer" aria-label="Toggle Push Notification">
            <span id="notification-icon">${i?"🔔":"🔕"}</span>
            <span id="notification-text">${i?"Disable Notification":"Enable Notification"}</span>
          </button>
        </li>
        <li><button id="logout-button" class="px-6 py-2 ml-0 lg:ml-4 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 hover:scale-105 active:scale-95 transition-all block w-full lg:w-auto text-center shadow-lg cursor-pointer" aria-label="Logout dari aplikasi">Logout</button></li>
      `,E(this,h,I).call(this),document.querySelector("#logout-button").addEventListener("click",()=>{localStorage.removeItem("user_token"),window.location.hash="#/login"})}else e.innerHTML=`
        ${r}
        <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/register">Register</a></li>
        <li><a class="px-6 py-2 ml-0 lg:ml-4 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all block text-center shadow-lg" href="#/login">Login</a></li>
      `},I=function(){const e=document.querySelector("#notification-toggle"),t=document.querySelector("#notification-icon"),r=document.querySelector("#notification-text");e.addEventListener("click",async()=>{await F.isSubscribed()?await F.unsubscribe()&&(t.innerText="🔕",r.innerText="Enable Notification"):await F.subscribe()?(t.innerText="🔔",r.innerText="Disable Notification"):alert("Failed to subscribe to notifications. Please check your browser settings.")})},O=function(e){["/login","/register"].includes(e)?l(this,k).style.display="none":l(this,k).style.display="block"};document.addEventListener("DOMContentLoaded",async()=>{const a=new ge({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer"),header:document.querySelector("header")});if(window.location.hash||(window.location.hash="#/login"),await a.renderPage(),window.addEventListener("hashchange",async()=>{await a.renderPage()}),"serviceWorker"in navigator)try{await navigator.serviceWorker.register("/service-worker.js"),console.log("Service Worker registered successfully.")}catch(e){console.error("Service Worker registration failed:",e)}});
