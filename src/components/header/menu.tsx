import { motion } from "framer-motion"

function ThemeToggle() {
  const { isDark, toggleDark } = useDark()
  return (
    <li onClick={toggleDark} className="cursor-pointer [&_*]:cursor-pointer transition-all">
      <span className={$("inline-block", isDark ? "i-ph-moon-stars-duotone" : "i-ph-sun-dim-duotone")} />
      <span>
        {isDark ? "浅色模式" : "深色模式"}
      </span>
    </li>
  )
}

export function Menu() {
  const { enableLogin, loggedIn, login, logout } = useLogin()
  const [shown, setShown] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  return (
    <span ref={ref}>
      <button
        type="button"
        className="btn i-ph:dots-three-vertical-duotone"
        onClick={() => setShown(!shown)}
      />
      {shown && (
        <div className="absolute right-0 z-99 bg-transparent pt-4 top-4">
          <motion.div
            id="dropdown-menu"
            className={$([
              "w-200px",
              "bg-primary backdrop-blur-5 bg-op-70! rounded-lg shadow-xl",
            ])}
            initial={{
              scale: 0.9,
            }}
            animate={{
              scale: 1,
            }}
          >
            <ol className="bg-base bg-op-70! backdrop-blur-md p-2 rounded-lg color-base text-base">
              {enableLogin && (loggedIn
                ? (
                    <li onClick={logout}>
                      <span className="i-ph:sign-out-duotone inline-block" />
                      <span>退出登录</span>
                    </li>
                  )
                : (
                    <li onClick={login}>
                      <span className="i-ph:sign-in-duotone inline-block" />
                      <span>Github 账号登录</span>
                    </li>
                  ))}
              <ThemeToggle />
            </ol>
          </motion.div>
        </div>
      )}
    </span>
  )
}
