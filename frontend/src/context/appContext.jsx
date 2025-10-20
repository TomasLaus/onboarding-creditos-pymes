import React, { createContext, useState, useContext } from 'react'

// 1️⃣ Creamos el contexto
const AppContext = createContext()

// 2️⃣ Provider
export const AppProvider = ({ children }) => {
  const initialPropsUserData = {
    legalName: '',
    taxId: '',
    email: '',
    phone: '',
    idUser: '',
    idCompany: '',
    companyAltEmail: ''
  }
  const [userData, setUserData] = useState(initialPropsUserData)
  const [tokenLogin, setTokenLogin] = useState(null)
  const logout = () => setUserData(null)

  return (
    <AppContext.Provider
      value={{ userData, setUserData, tokenLogin, setTokenLogin, logout }}
    >
      {children}
    </AppContext.Provider>
  )
}

// 3️⃣ Hook para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider')
  }
  return context
}
