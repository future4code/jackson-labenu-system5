export default function generateId(): string {
   return String(Date.now() + Math.random())
}