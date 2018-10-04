const AppLayout = ({ children, location }) => {
  return (
    <div className="app">
      <div className="container">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default AppLayout
