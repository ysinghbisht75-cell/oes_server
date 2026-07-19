import User from '../models/User.js'

const getNextId = () => Date.now()

export async function loginUser(request, response) {
  const { role, name, email, password } = request.body
  const normalizedName = String(name || '').trim().toLowerCase()
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const normalizedPassword = String(password || '').trim()

  const user = await User.findOne({
    role,
    password: normalizedPassword,
    $or: [{ email: normalizedEmail }, { name: normalizedName }],
  })

  if (!user) {
    response.status(401).json({
      error:
        role === 'admin'
          ? 'Invalid admin credentials.'
          : 'Invalid student credentials. Register first .',
    })
    return
  }

  response.json({
    user: {
      role: user.role,
      name: user.name,
      email: user.email,
    },
  })
}

export async function registerUser(request, response) {
  const { role, name, email, password } = request.body
  const normalizedName = String(name || '').trim()
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const normalizedPassword = String(password || '').trim()

  if (!normalizedName || !normalizedEmail || !normalizedPassword) {
    response.status(400).json({ error: 'Please fill in all fields before registering.' })
    return
  }

  if (role === 'admin') {
    response.status(400).json({
      error: 'Admin access is fixed. Use the built-in admin credentials to sign in.',
    })
    return
  }

  const existingUser = await User.findOne({ email: normalizedEmail })
  if (existingUser) {
    response.status(409).json({ error: 'An account with this email already exists.' })
    return
  }

  const user = await User.create({
    id: getNextId(),
    role: 'student',
    name: normalizedName,
    email: normalizedEmail,
    password: normalizedPassword,
  })

  response.status(201).json({
    user: {
      role: user.role,
      name: user.name,
      email: user.email,
    },
  })
}
