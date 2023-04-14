import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Data {
  key: string;
  value: {
    JmlSuaraSahCalonA: number;
    JmlSuaraSahCalonB: number;
    JmlSuaraSahSeluruhCalon: number;
    JmlSuaraSahTidakSah: number;
    JmlSuaraTidakSah: number;
    JmlSuratDigunakan: number;
    JmlSuratDikembalikan: number;
    JmlSuratDiterima: number;
    JmlSuratTidakDigunakan: number;
  };
}

const DataVoice: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string>('kabupaten-aceh-barat-daya');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/channels/${selectedChannel}/chaincodes/voting-kecamatan`,
          {
            params: {
              args: '["TPS"]',
              fcn: 'fetchData'
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setData(response.data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedChannel]);

  // fungsi untuk memperbarui data saat data baru tersedia
  const updateData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/channels/${selectedChannel}/chaincodes/voting-kecamatan`,
        {
          params: {
            args: '["TPS"]',
            fcn: 'fetchData'
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // menggunakan setInterval untuk memperbarui data setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      updateData();
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedChannel]);

  const handleChannelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Terjadi kesalahan saat memuat data: {error}</div>;
  }

  type ChannelData = {
    [key: string]: string;
  }
  const channelOptions: ChannelData =  {
    aceh: 'Aceh',
    'kabupaten-aceh-barat': 'Kabupaten Aceh Barat',
    'kabupaten-aceh-barat-daya': 'Kabupaten Aceh Barat Daya',
    // Tambahkan channel beserta keterangan terkait di sini
  };
  return (
    <div>
      <label htmlFor="channel-select">Pilih Channel: </label>
      <select id="channel-select" value={selectedChannel} onChange={handleChannelChange}>
      {Object.entries(channelOptions).map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>

      {selectedChannel === 'aceh' ? (
        <h2>Berikut merupakan data suara di Aceh</h2>
      ) : (
        <h2>Berikut merupakan data suara di {channelOptions[selectedChannel]}</h2>
      )}

      {data.map((item, index) => (
        <div key={index}>
            <h4>TPS {item.key}</h4>
            <p>Jumlah Suara Sah Calon A: {item.value.JmlSuaraSahCalonA}</p>
            <p>Jumlah Suara Sah Calon B: {item.value.JmlSuaraSahCalonB}</p>
            <p>Jumlah Suara Sah Seluruh Calon: {item.value.JmlSuaraSahSeluruhCalon}</p>
            <p>Jumlah Suara Sah dan Tidak Sah: {item.value.JmlSuaraSahTidakSah}</p>
            <p>Jumlah Suara Tidak Sah: {item.value.JmlSuaraTidakSah}</p>
            <p>Jumlah Surat Digunakan: {item.value.JmlSuratDigunakan}</p>
            <p>Jumlah Surat Dikembalikan: {item.value.JmlSuratDikembalikan}</p>
            <p>Jumlah Surat Diterima: {item.value.JmlSuratDiterima}</p>
            <p>Jumlah Surat Tidak Digunakan: {item.value.JmlSuratTidakDigunakan}</p>
        </div>
      ))}
    </div>
  );
};

export default DataVoice;
