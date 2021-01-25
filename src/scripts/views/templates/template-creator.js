const createSideNavTemplate = () => '<i class="material-icons">menu</i>';

const createSideNavSyncronTemplate = () => `
  <i class="material-icons">sync</i>
`;

const createSideNavUserTemplate = (user) => `
  <span class="display-name">${user.display_name}</span>
  <span class="white-text">${user.username}</span>
`;

const createSideNavLoginBtnTemplate = () => '<span class="masuk"><a href="/masuk">Masuk dengan google</a></span>';

const createBackNavTemplate = () => '<i class="material-icons">arrow_back</i>';

const createEmptyListTemplate = (listName) => `
  <div class="container max-height empty-list">
    <h1>Tidak Ada ${listName}.</h1>
  </div>
`;

const createPelajaranEmptyTemplate = () => `
  <hr>
  <div class="pelajaran-empty">
    <h2>Tidak ada pelajaran</h2>
  </div>
`;

const createFullLoadingTemplate = () => `
  <div class="container loading-container center-align">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
`;

const createLoadingTemplate = () => `
  <div class="container loading-container max-height">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
`;

const createAboutTemplate = () => `
  <div class= "about">
      <span>Dibuat oleh Yusril A. P.</span>
      <span>Logo oleh Dwi Randi R.</span>
  </div>
`;

const createAboutFooterTemplate = () => `
  <div class= "about-footer center-align">
      <a href="https://www.instagram.com/yusril_adr" target="_blank" rel="noopener noreferrer" aria-label="instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://www.facebook.com/yusril.adr" target="_blank" rel="noopener noreferrer" aria-label="facebook">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="https://github.com/yusril-adr" target="_blank" rel="noopener noreferrer" aria-label="github">
        <i class="fab fa-github"></i>
      </a>
  </div>
`;

const createHomePageTemplate = () => `
  <section class="jumbotron green darken-1">
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="greeting-container">
            <div class="greeting-text-container white-text">
              <p class="greeting">Halo, <span class="display-name"></span></p>
              <p>Apa yang ingin kamu lakukan hari ini ?</p>
            </div>

            <img src="images/studying.png" alt="Studying Illustrattion">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container menu">
    <div class="row center-align">
      <div class="col s6 m4 offset-m2">
        <a href="/tugas" aria-label="tugas sekolah">
          <div class="card">
            <div class="card-content red-text">
              <i class="material-icons">assignment</i>
              <span class="menu-text">Tugas Sekolah</span>
            </div>
          </div>
        </a>
      </div>

      <div class="col s6 m4">
        <a href="/jadwal" aria-label="jadwal pelajaran">
          <div class="card">
            <div class="card-content purple-text text-darken-1">
              <i class="material-icons">schedule</i>
              <span class="menu-text">Jadwal Pelajaran</span>
            </div>
          </div>
        </a>
      </div>
      <div class="col s6 m4 offset-m2">
        <a href="/nilai" aria-label="nilai kamu">
          <div class="card">
            <div class="card-content blue-text text-darken-1">
              <i class="material-icons">school</i>
              <span class="menu-text">Nilai Kamu</span>
            </div>
          </div>
        </a>
      </div>
      <div class="col s6 m4">
        <a href="/resolusi" aria-label="Resolusi kamu">
          <div class="card">
            <div class="card-content orange-text text-darken-1">
              <i class="material-icons">lightbulb_outline</i>
              <span class="menu-text">Resolusi Kamu</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
`;

const createTugasPageTemplate = () => `
  <section class="menu green">
    <div class="container white-text">
      <button class="waves-effect waves-light" id="belum-selesai" disabled>Belum Selesai</button>
      <button class="waves-effect waves-light" id="selesai">Selesai</button>
    </div>
  </section>

  <section class="list">
  </section>

  <button class="tambah btn-floating btn-large waves-effect waves-light green" aria-label="Tugas Baru">
    <i class="material-icons">add</i>
  </button>
`;

const createTugasContainerTemplate = (deadline) => `
  <span class="tanggal">Tenggat : ${deadline}</span>
  <ul class="list-tugas">
  </ul>
`;

const createTugasBelumTemplate = (tugas) => `
  <div class="tugas">
    <div class="detail-tugas">
      <span class="judul-tugas">${tugas.tugas}</span>
      <span class="tugas-pelajaran">${tugas.pelajaran}</span>
    </div>

    <div class="tugas-action">
      <button class="sudah" tugas-id="${tugas.local_id || tugas._id}" aria-label="Tugas Selesai">
        <i class="material-icons">done</i>
      </button>
      <button class="hapus" tugas-id="${tugas.local_id || tugas._id}" aria-label="Hapus tugas">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
  <hr>
`;

const createTugasSelesaiTemplate = (tugas) => `
  <div class="tugas">
    <div class="detail-tugas">
      <span class="judul-tugas">${tugas.tugas}</span>
      <span class="tugas-pelajaran">${tugas.pelajaran}</span>
    </div>

    <div class="tugas-action">
      <button class="belum" tugas-id="${tugas.local_id || tugas._id}" aria-label="Pindah ke Belum selesai">
        <i class="material-icons">low_priority</i>
      </button>
      <button class="hapus" tugas-id="${tugas.local_id || tugas._id}" aria-label="Hapus tugas">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
  <hr>
`;

const createJadwalPageTemplate = () => `
  <section class="container list">
  </section>
`;

const createJadwalDayTemplate = (day) => `
  <div class="card">
    <div class="card-content">
      <span class="card-title">${day.toUpperCase()} <a href="/jadwal/${day.toLowerCase()}" class="material-icons" aria-label="ubah">edit</a></span>

      <ul class="list-pelajaran"></ul>
    </div>
  </div>
`;

const createJadwalPelajaranTemplate = (pelajaran) => `
  <div class="pelajaran">
    <span class="nama-pelajaran">${pelajaran.nama}</span>
    <span class="jam-pelajaran">${pelajaran.jam}</span>
  </div>
  <hr> 
`;

const createJadwalVerbPageTemplate = (day) => `
  <section class="container list">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card">
          <div class="card-content">
            <span class="card-title">${day.toUpperCase()}</span>

            <ul class="list-pelajaran"></ul>

            <div class="card-action">
              <button class="tambah waves-effect waves-light btn green" aria-label="Tambah pelajaran"><i class="material-icons left">add</i> Tambah</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const createJadwalVerbPelajaranTemplate = (pelajaran) => `
  <div class="pelajaran">
    <div class="detail-pelajaran">
      <span class="nama-pelajaran">${pelajaran.nama}</span>
      <span class="jam-pelajaran">${pelajaran.jam}</span>
    </div>
    

    <div class="pelajaran-action">
      <button class="ubah" pelajaran-id="${pelajaran.local_id || pelajaran._id}" aria-label="ubah pelajaran">
        <i class="material-icons">edit</i>
      </button>
      <button class="hapus" pelajaran-id="${pelajaran.local_id || pelajaran._id}" aria-label="hapus pelajaran">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
  <hr>
`;

const createNilaiPageTemplate = () => `
  <section class="container">
    <div class="row">
      <div class="col s12 m6 offset-m3" id="rekap">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Rekap</span>

            <ul class="list-rekap">
              <li>
                <div class="rekap">
                  <span class="rekap-kategori">Target nilai semester ini</span>
                  <span class="nilai-rekap">80</span>
                </div>
                <hr>
              </li>

              <li>
                <div class="rekap">
                  <span class="rekap-kategori">Total nilai sekarang</span>
                  <span class="nilai-rekap">80</span>
                </div>
                <hr>
              </li>

              <li>
                <div class="rekap">
                  <span class="rekap-kategori">Target nilai keseluruhan</span>
                  <span class="nilai-rekap">80</span>
                </div>
                <hr>
              </li>

              <li>
                <div class="rekap">
                  <span class="rekap-kategori">Target semester</span>
                  <span class="nilai-rekap">5</span>
                </div>
                <hr>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col s12 m6 offset-m3" id="semester-2">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Semester 2 <a href="/nilai/2" class="material-icons" aria-label="ubah">edit</a></span>

            <ul class="list-pelajaran">
              <li>
                <div class="pelajaran">
                  <span class="nama-pelajaran">Program Dasar</span>
                  <span class="nilai-pelajaran">100</span>
                </div>
                <hr>
              </li>
              
              <li>
                <div class="pelajaran">
                  <span class="nama-pelajaran">Struktur Data</span>
                  <span class="nilai-pelajaran">90</span>
                </div>
                <hr>
              </li>

              <li>
                <div class="pelajaran">
                  <span class="nama-pelajaran">Basis Data</span>
                  <span class="nilai-pelajaran">80</span>
                </div>
                <hr>
              </li>

              <li>
                <div class="rekap">
                  <span class="rekap-kategori">Nilai Total</span>
                  <span class="nilai-rekap">90</span>
                </div>
                <hr>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col s12 m6 offset-m3" id="semester-1">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Semester 1 <a href="/nilai/1" class="material-icons" aria-label="ubah">edit</a></span>

            <ul class="list-pelajaran">
              <li>
                <div class="pelajaran">
                  <span class="nama-pelajaran">Program Dasar</span>
                  <span class="nilai-pelajaran">100</span>
                </div>
                <hr>
              </li>
              
              <li>
                <div class="pelajaran">
                  <span class="nama-pelajaran">Struktur Data</span>
                  <span class="nilai-pelajaran">90</span>
                </div>
                <hr>
              </li>

              <li>
                <div class="pelajaran">
                  <span class="nama-pelajaran">Basis Data</span>
                  <span class="nilai-pelajaran">80</span>
                </div>
                <hr>
              </li>

              <li>
                <div class="rekap">
                  <span class="rekap-kategori">Nilai Total</span>
                  <span class="nilai-rekap">90</span>
                </div>
                <hr>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <button class="tambah btn-floating btn-large waves-effect waves-light green" aria-label="Senester Baru">
    <i class="material-icons">add</i>
  </button>
`;

const createNilaiVerbPageTemplate = (semester) => `
  <section class="container">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Semester <span class="verb">${semester}</span></span>

            <ul class="list-pelajaran"></ul>

            <div class="card-action">
              <button class="tambah waves-effect waves-light btn green" aria-label="Tambah pelajaran"><i class="material-icons left">add</i> Tambah</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <button class="hapus-semester btn-floating btn-large waves-effect waves-light red" aria-label="Hapus semester ini">
    <i class="material-icons">delete</i>
  </button>
`;

const createNilaiVerbNilaiTemplate = (nilai) => `
  <div class="pelajaran">
    <div class="detail-pelajaran">
      <span class="nama-pelajaran">${nilai.nama}</span>
      <span class="nilai-pelajaran">${nilai.nilai}</span>
    </div>
    

    <div class="pelajaran-action">
      <button class="ubah" pelajaran-id="${nilai.local_id || nilai._id}">
        <i class="material-icons">edit</i>
      </button>
      <button class="hapus" pelajaran-id="${nilai.local_id || nilai._id}">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
  <hr>
`;

const createResolusiPageTemplate = () => `
  <section class="menu green">
    <div class="container white-text">
      <button class="waves-effect waves-light" id="belum-tercapai" disabled>Belum Tercapai</button>
      <button class="waves-effect waves-light" id="tercapai">Tercapai</button>
    </div>
  </section>

  <section class="resolusi-list container"></section>

  <button class="tambah btn-floating btn-large waves-effect waves-light green" aria-label="Resolusi baru">
    <i class="material-icons">add</i>
  </button>
`;

const createResolusiBelumTemplate = (resolusi) => `
  <div class="card">
    <div class="card-content">
      <p class="resolusi-text">
        ${resolusi.resolusi}
      </p>
    </div>

    <div class="card-action">
      <button class="tercapai waves-effect waves-light btn green" aria-label="Resolusi tercapai" resolusi-id="${resolusi.local_id || resolusi._id}">
        Tercapai
      </button>

      <button class="ubah waves-effect waves-light btn orange" aria-label="Ubah Resolusi" resolusi-id="${resolusi.local_id || resolusi._id}">
        Ubah
      </button>

      <button class="hapus waves-effect waves-light btn red" aria-label="Hapus resolusi" resolusi-id="${resolusi.local_id || resolusi._id}">
        Hapus
      </button>
    </div>
  </div>
`;

const createResolusiTercapaiTemplate = (resolusi) => `
  <div class="card">
    <div class="card-content">
      <p class="resolusi-text">
        ${resolusi.resolusi}
      </p>
    </div>

    <div class="card-action">
      <button class="belum waves-effect waves-light btn green" aria-label="Resolusi belum tercapai" resolusi-id="${resolusi.local_id || resolusi._id}">
        Belum
      </button>

      <button class="ubah waves-effect waves-light btn orange" aria-label="Ubah Resolusi" resolusi-id="${resolusi.local_id || resolusi._id}">
        Ubah
      </button>

      <button class="hapus waves-effect waves-light btn red" aria-label="Hapus resolusi" resolusi-id="${resolusi.local_id || resolusi._id}">
        Hapus
      </button>
    </div>
  </div>
`;

const createSimpanPageTemplate = () => `
  <section class="container">
    <div class="row">
      <div class="col s12 m6">
        <div class="card">
          <div class="card-content">
            <div class="device-section">
              <span class="card-title">Komputer</span>

              <ol>
                <li>Di komputer, buka Chrome.</li>
                <li>Buka situs yang ingin diinstal.</li>
                <li>Di bagian kanan atas kolom URL, klik Instal <img src="images/tambah.png" alt="Tambah" title="Tambah" width="18" height="18">.</li>
                <li>Ikuti petunjuk di layar untuk menginstal.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="col s12 m6">
        <div class="card">
          <div class="card-content">
            <div class="device-section">
              <span class="card-title">Android</span>

              <ol>
                <li>Pada perangkat Android, buka Chrome <img src="images/chrome.png" alt="Chrome" title="Chrome" width="18" height="18">.</li>
                <li>Buka situs yang ingin diinstal.</li>
                <li>Ketuk <strong>Tambahkan ke layar utama</strong>.</li>
                <li>Ikuti petunjuk di layar untuk menginstal.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const createPengaturanPageTemplate = () => `
  <section class="container">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card">
          <div class="card-content">
            <ul>
              <li>
                <div class="target-nilai">
                  <p>Target nilai</p>

                  <div class="target-nilai-container">
                    <span id="target-nilai"></span>
                    <button class="ubah orange-text" id="edit-nilai" aria-label="ubah target nilai">
                      <i class="material-icons">edit</i>
                    </button>
                  </div>
                  
                </div>
                <hr>
              </li>

              <li>
                <div class="target-semester">
                  <p>Target semester</p>
                  <div class="target-semester-container">
                    <span id="target-semester"></span>
                    <button class="ubah orange-text" id="edit-semester" aria-label="ubah target semester">
                      <i class="material-icons">edit</i>
                    </button>
                  </div>
                </div>
                <hr>
              </li>
            </ul>

            <div class="card-action">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const createMasukButtonTemplate = () => `
  <button class="waves-effect waves-light btn green" aria-label="Masuk Akun" id="masuk">
    <i class="material-icons left">account_circle</i> Masuk
  </button>
`;

const createKeluarButtonTemplate = () => `
  <button class="keluar waves-effect waves-light btn red" aria-label="Keluar Akun" id="keluar">
    <i class="material-icons left">account_circle</i> Keluar
  </button>
`;

export {
  createSideNavUserTemplate,
  createSideNavSyncronTemplate,
  createSideNavLoginBtnTemplate,
  createSideNavTemplate,
  createBackNavTemplate,
  createEmptyListTemplate,
  createFullLoadingTemplate,
  createLoadingTemplate,
  createAboutTemplate,
  createAboutFooterTemplate,
  createHomePageTemplate,
  createTugasPageTemplate,
  createTugasContainerTemplate,
  createTugasBelumTemplate,
  createTugasSelesaiTemplate,
  createJadwalPageTemplate,
  createJadwalDayTemplate,
  createJadwalPelajaranTemplate,
  createPelajaranEmptyTemplate,
  createJadwalVerbPageTemplate,
  createJadwalVerbPelajaranTemplate,
  createNilaiPageTemplate,
  createNilaiVerbPageTemplate,
  createNilaiVerbNilaiTemplate,
  createResolusiPageTemplate,
  createResolusiBelumTemplate,
  createResolusiTercapaiTemplate,
  createSimpanPageTemplate,
  createPengaturanPageTemplate,
  createMasukButtonTemplate,
  createKeluarButtonTemplate,
};
