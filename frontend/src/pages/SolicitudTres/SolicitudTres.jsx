import React, { useState, useRef } from 'react'
import { FiFilePlus, FiChevronDown } from 'react-icons/fi'
import './SolicitudTres.css'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'

const Documentostres = () => {
  const URL_BACKEND =
    import.meta.env.VITE_NODE_ENV === 'production'
      ? import.meta.env.VITE_BACKEND_PRODUCTION
      : import.meta.env.VITE_BACKEND_LOCAL

  const { userData, creditApplicationData } = useAppContext()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = fileList => {
    const newFiles = Array.from(fileList)
    setFiles(prevFiles => [...prevFiles, ...newFiles])
    console.log('Archivos seleccionados:', newFiles)
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    handleFileSelect(e.dataTransfer.files)
  }

  const handleFileChange = e => {
    handleFileSelect(e.target.files)
  }

  const onButtonClick = e => {
    e.stopPropagation()
    fileInputRef.current.click()
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Por favor, selecciona al menos un archivo antes de continuar.')
      return
    }

    let formData = new FormData()
    files.forEach(file => formData.append('files', file)) // 'files' = nombre del campo esperado por el backend
    // Agregar campos extra
    formData.append('creditId', creditApplicationData.idCreditApplication)
    formData.append('uploadedById', userData.idUser)
    formData.append('companyId', userData.idCompany)

    try {
      setUploading(true)
      setUploadStatus(null)

      const response = await axios.post(
        `${URL_BACKEND}/api/document`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log('Respuesta del servidor:', response.data)
      alert('¡Datos guardados con éxito!')
      setUploadStatus('Archivos subidos exitosamente ✅')
    } catch (error) {
      alert('Error al subir archivos: solo se permiten archivos PDF, JPG y PNG')
      setFiles([])
      setUploadStatus('Error al subir archivos ❌')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Firma tu solicitud</h2>
        <p>Paso 3 de 3</p>

        <div className="stepper">
          <span className="step"></span>
          <span className="step"></span>
          <span className="step active"></span>
        </div>
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
            <p className="dropzone-prompt">
              Arrastra o haz clic aquí para subir un archivo
            </p>
          </div>
        </div>
      </div>

      <p className="upload-info">Aceptamos PDF, JPG, PNG • Máx. 10 MB</p>

      {files.length > 0 && (
        <>
          <h3>Archivos seleccionados:</h3>
          <ul className="attached-files">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </>
      )}

      <div className="document-actions">
        {/* <button type="button" className="btn btn-save">
          Volver
        </button> */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          type="button"
          className="btn btn-continue"
        >
          {uploading ? (
            <>
              <div className="spinner"></div>
              <p>Subiendo archivos...</p>
            </>
          ) : (
            'Continuar'
          )}
        </button>
      </div>
    </div>
  )
}

export default Documentostres
