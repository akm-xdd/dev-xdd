// app/curl-response/route.ts
import { NextResponse } from 'next/server'
import figlet from 'figlet'
// @ts-ignore: no types for this importable font module
import slantFont from 'figlet/importable-fonts/Slant.js'
import gradient from 'gradient-string'
import chalk from 'chalk'

chalk.level = 3

// 1) Bundle the Figlet font
figlet.parseFont('Slant', slantFont)

export async function GET() {
  // 2) Render your “dev-xdd” banner
  const raw = figlet.textSync('dev-xdd', { font: 'Slant' })
  const lines = raw.split('\n')
  const width = lines.reduce((m, l) => Math.max(m, l.length), 0)
  const pad = 2

  // 3) Pick a three-tone gradient for the frame
  const frameGrad = gradient(['#ff0055', '#ffaa00', '#00ff66'])

  // 4) Build top/bottom borders and empty padding line
  const horizontal = '─'.repeat(width + pad * 2)
  const top    = frameGrad(`┌${horizontal}┐`)
  const bottom = frameGrad(`└${horizontal}┘`)
  const empty  = frameGrad(`│${' '.repeat(width + pad * 2)}│`)

  // 5) Gradient-color each content line, with side padding
  const content = lines.map(line => {
    const text = line.padEnd(width, ' ')
    return frameGrad('│' + ' '.repeat(pad)) + frameGrad(text) + frameGrad(' '.repeat(pad) + '│')
  })

  // 6) Assemble the framed banner
  const framedBanner = [top, empty, ...content, empty, bottom].join('\n')

  // 7) Draw the Indian flag stripes with blue Chakra
  const stripeRGB = (r: number, g: number, b: number) => chalk.bgRgb(r, g, b)(' '.repeat(width + pad * 2 + 2))
  const saffron = stripeRGB(255, 153,  51)
  const whiteArr = Array(width + pad * 2 + 2).fill(chalk.bgWhite(' '))
  whiteArr[Math.floor(whiteArr.length/2)] = chalk.bgWhite.blueBright('☸')
  const white   = whiteArr.join('')
  const green   = stripeRGB( 19, 136,   8)

  // 8) Add a “Links” section in neon accents
  const info = [
    '',
    chalk.bold.underline.hex('#00ffff')('✦ Links'),
    chalk.hex('#7fffd4')('🌐 Blog:')     + ' https://dev-xdd.tech',
    chalk.hex('#7fffd4')('🐙 GitHub:')   + ' https://github.com/akm-xdd',
    chalk.hex('#7fffd4')('🔗 LinkedIn:') + ' https://linkedin.com/in/akm-glhf',
  ].join('\n')

  // 9) Combine everything
  const body = [framedBanner, '', saffron, white, green, info].join('\n')

  return new NextResponse(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
