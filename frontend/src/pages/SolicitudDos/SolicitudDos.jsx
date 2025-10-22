import React, { useState, useRef } from 'react';
import { FiFilePlus, FiChevronDown } from 'react-icons/fi'; 
import './SolicitudDos.css'; 

const DocumentosDos = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);


  const handleFileSelect = (fileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    console.log('Archivos seleccionados:', newFiles);

  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileChange = (e) => {
    handleFileSelect(e.target.files);
  };

  const onButtonClick = (e) => {
    e.stopPropagation(); 
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Por favor, selecciona al menos un archivo antes de continuar.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file)); // 'files' = nombre del campo esperado por el backend

    try {
      setUploading(true);
      setUploadStatus(null);

      const response = await axios.post('aqui va el enpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);
      setUploadStatus('Archivos subidos exitosamente ✅');
    } catch (error) {
      console.error('Error al subir archivos:', error);
      setUploadStatus('Error al subir archivos ❌');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-container">
      
      <div className="form-header">

        <h2>Sube tus documentos:</h2>
        <p>Paso 2 de 3</p>

        <div className="stepper">
          <span className="step"></span>
          <span className="step active"></span>
          <span className="step"></span>
        </div>
      </div>

      <h3>Lista de documentos requeridos</h3>
      <div className="document-list">
        <p>Ficha TIN</p>
        <p>DNI Representante legal</p>
        <p>Estados financieros*</p>
        <p>Reporte tributario de los 3 últimos meses*</p>
        <p className="required-note">*Documento obligatorio</p>
      </div>

      <h3>Carga de documentos</h3>

      <div 
        className="dropzone"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()} 
      >
        <input
          type="file"
          id="file-upload"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}
        />
        
        <div className="dropzone-content">
          <FiFilePlus className="dropzone-icon" />
          
          <div className="dropzone-text-area">
            <button 
              type="button" 
              className="dropzone-button"
              onClick={onButtonClick} 
            >
              Elegir archivos
              <FiChevronDown size={20} />
            </button>
            <p className="dropzone-prompt">Arrastra o haz clic aquí para subir archivo</p>
          </div>
        </div>
      </div>
      
      <p className="upload-info">Aceptamos PDF, JPG, PNG • Máx. 10 MB</p>


      <div className="document-actions">
        <button type="button" className="btn btn-save">
          Volver
        </button>
        <button type="button" className="btn btn-continue">
          {uploading ? ( <div className="spinner"></div>) : ('Continuar')}
        </button>
      </div>
    </div>
  );
};

export default DocumentosDos;