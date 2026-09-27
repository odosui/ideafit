// How a host site signs its user in, one example per server language.
export interface SigningExample {
  language: string
  code: string
}

export const SIGNING_EXAMPLES: SigningExample[] = [
  {
    language: 'Node',
    code: `// npm install jsonwebtoken
import jwt from 'jsonwebtoken'

const token = jwt.sign(
  { id: user.id, name: user.name, email: user.email, avatar: user.avatarUrl },
  process.env.IDEAFIT_SECRET,
  { algorithm: 'HS256', expiresIn: '1h' },
)`,
  },
  {
    language: 'Ruby',
    code: `# gem "jwt"
token = JWT.encode(
  { id: user.id, name: user.name, email: user.email, avatar: user.avatar_url, exp: 1.hour.from_now.to_i },
  ENV.fetch("IDEAFIT_SECRET"),
  "HS256"
)`,
  },
  {
    language: 'Python',
    code: `# pip install pyjwt
import os, time, jwt

token = jwt.encode(
    {"id": str(user.id), "name": user.name, "email": user.email, "avatar": user.avatar_url, "exp": int(time.time()) + 3600},
    os.environ["IDEAFIT_SECRET"],
    algorithm="HS256",
)`,
  },
  {
    language: 'PHP',
    code: `// composer require firebase/php-jwt
use Firebase\\JWT\\JWT;

$token = JWT::encode([
    'id' => $user->id,
    'name' => $user->name,
    'email' => $user->email,
    'avatar' => $user->avatarUrl,
    'exp' => time() + 3600,
], getenv('IDEAFIT_SECRET'), 'HS256');`,
  },
]
