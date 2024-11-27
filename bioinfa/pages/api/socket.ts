import { Server } from 'socket.io'
import type { NextApiRequest, NextApiResponse } from 'next'

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log('User connected')

      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })

      socket.on('blastQuery', data => {
        socket.broadcast.emit('blastResult', data)
      })
    })
  }
  res.end()
}

export default SocketHandler

