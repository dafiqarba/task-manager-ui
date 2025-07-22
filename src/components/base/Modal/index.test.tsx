import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Modal from './'

describe('Modal Component', () => {
  it('renders the modal with the correct content', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <>Test Content</>
      </Modal>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <>Test Content</>
      </Modal>
    )
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })
})
