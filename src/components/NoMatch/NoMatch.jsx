import { Button, Result } from 'antd'
import { useHistory } from 'react-router-dom'

const NoMatch = () => {
  const history = useHistory()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          onClick={() => {
            history.push('/')
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  )
}

export default NoMatch
