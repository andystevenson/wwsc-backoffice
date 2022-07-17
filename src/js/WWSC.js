console.log('Hello from WWSC!!', window.netlifyIdentity, new Date().getTime())

const elements = {
  login: document.getElementById('login'),
  logout: document.getElementById('logout'),
}

const showLogin = (user) => {
  console.log('showLogin', { user }, 'email', user?.email)
  elements.login.style.display = 'block'
  elements.logout.style.display = 'none'
  elements.logout.textContent = `logout`
}

const showLogout = (user) => {
  console.log('showLogout', { user }, 'email', user?.email)
  elements.login.style.display = 'none'
  elements.logout.style.display = 'block'
  elements.logout.textContent = `${user?.email} logout`
}

window.netlifyIdentity.on('init', (user) => {
  console.log('init', user)
  user ? showLogout(user) : showLogin(user)
})

// Bind to events
window.netlifyIdentity.on('login', (user) => {
  console.log('login', user)
  showLogout(user)
  window.netlifyIdentity.close()
})

window.netlifyIdentity.on('logout', () => {
  const user = window.netlifyIdentity.currentUser()
  console.log('logged out')
  showLogin(user)
  window.netlifyIdentity.close()
})

window.netlifyIdentity.on('error', (err) => console.error('Error', err))
window.netlifyIdentity.on('open', () => console.log('Widget opened'))
window.netlifyIdentity.on('close', () => console.log('Widget closed'))

const login = async () => {
  window.netlifyIdentity.open() && (await window.netlifyIdentity.refresh())
}

const logout = async () => window.netlifyIdentity.logout()

elements.login.addEventListener('click', async () => {
  console.log('login clicked', window.netlifyIdentity)
  login()
})

elements.logout.addEventListener('click', async () => {
  console.log('logout clicked', window.netlifyIdentity)
  logout()
})

window.addEventListener('pageshow', async () => {
  const user = window?.netlifyIdentity?.currentUser()
  const newUser = await (await fetch('/.netlify/functions/user')).json()
  console.log(`pageshow ${window.location.href} ${new Date().getTime()}`, {
    user,
    newUser,
  })

  user ? showLogout(user) : showLogin(user)
})
