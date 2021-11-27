/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react'
import { RouteComponentProps } from '@reach/router'

const Ticket = ({ children }: RouteComponentProps<{ readonly children: ReactNode }>) => {
	return <>
		{children}
	</>
}

export default Ticket
