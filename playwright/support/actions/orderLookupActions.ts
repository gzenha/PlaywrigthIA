import { Page, expect } from '@playwright/test'

export type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

export type OrderDetails = {
  number: string
  status: OrderStatus
  color: string
  wheels: string
  customer: { name: string; email: string; document: string; phone: string }
  payment: string
  total_price: string
}

export function createOrderLookupActions(page: Page) {
  const orderInput = page.getByRole('textbox', { name: 'Número do Pedido' })
  const searchButton = page.getByRole('button', { name: 'Buscar Pedido' })

  return {
    elements: {
      orderInput,
      searchButton,
    },

    async open() {
      await page.goto('/')
      const title = page.getByTestId('hero-section').getByRole('heading')
      await expect(title).toContainText('Velô Sprint')

      await page.getByRole('link', { name: 'Consultar Pedido' }).click()
      await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    },

    async searchOrder(code: string) {
      await orderInput.fill(code)
      await searchButton.click()
    },

    async validateOrderNotFound() {
      await expect(page.getByRole('heading', { name: 'Pedido não encontrado' })).toBeVisible()
    },
  }
}
