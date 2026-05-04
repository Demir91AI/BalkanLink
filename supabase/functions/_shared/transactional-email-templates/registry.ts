/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as reengagement7d } from './reengagement-7d.tsx'
import { template as reengagement30d } from './reengagement-30d.tsx'
import { template as adminNewUser } from './admin-new-user.tsx'
import { template as adminNewPayment } from './admin-new-payment.tsx'
import { template as adminNewReview } from './admin-new-review.tsx'
import { template as adminNewQuestion } from './admin-new-question.tsx'
import { template as adminNewBusiness } from './admin-new-business.tsx'
import { template as adminPdfVersionChanged } from './admin-pdf-version-changed.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'reengagement-7d': reengagement7d,
  'reengagement-30d': reengagement30d,
  'admin-new-user': adminNewUser,
  'admin-new-payment': adminNewPayment,
  'admin-new-review': adminNewReview,
  'admin-new-question': adminNewQuestion,
  'admin-new-business': adminNewBusiness,
  'admin-pdf-version-changed': adminPdfVersionChanged,
}
