interface SpinnerProps {
  fullscreen?: boolean
}

const Spinner = ({ fullscreen }: SpinnerProps) => (
  <div
    className={`h-full w-full flex items-center justify-center ${fullscreen ? 'min-h-[calc(100vh-128px)]' : ''}`}
  >
    <div className="border-2 border-current h-5 w-5 animate-spin" />
  </div>
)

export default Spinner
