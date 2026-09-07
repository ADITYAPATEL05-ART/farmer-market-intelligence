export const login = (req, res) => {
  const { role = 'farmer', mobile, otp } = req.body;

  const demoUsers = {
    farmer: {
      name: 'Ramesh Balasaheb Patil',
      role: 'farmer',
      organization: 'Nashik Sahyadri FPO',
      id: 'FARM-8812',
      phone: mobile || '+91 98224 88120'
    },
    buyer: {
      name: 'BigBasket Fresh Procurements Ltd',
      role: 'buyer',
      organization: 'Corporate Agri Trade',
      id: 'BUY-2194',
      gstin: '27AAACB2194D1Z8'
    },
    transporter: {
      name: 'Sunil Jadhav',
      role: 'transporter',
      organization: 'Kisan Express Fleet',
      id: 'TRP-4421',
      vehicle: 'MH-15-EG-4421'
    },
    admin: {
      name: 'APMC Regulatory Officer',
      role: 'admin',
      organization: 'Maharashtra APMC Directorate',
      id: 'MH-APMC-DIR-7701'
    }
  };

  const user = demoUsers[role] || demoUsers.farmer;

  return res.json({
    success: true,
    message: `Logged in successfully as ${user.name}`,
    token: `demo-jwt-token-${user.role}-${Date.now()}`,
    user
  });
};

export const getSession = (req, res) => {
  return res.json({
    success: true,
    authenticated: true,
    availableRoles: ['farmer', 'buyer', 'transporter', 'admin']
  });
};

