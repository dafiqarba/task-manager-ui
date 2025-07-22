import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { type Task } from '../store/taskStore'

export const exportTasksToPdf = (tasks: Task[]) => {
  const doc = new jsPDF()

  const appName = 'TaskApp'
  const timestamp = new Date().toLocaleString()

  doc.setFontSize(18)
  doc.setTextColor(59, 130, 246)
  doc.text(appName, 14, 16)

  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(`Generated at: ${timestamp}`, 14, 22)

  autoTable(doc, {
    startY: 38,
    head: [['Title', 'Description', 'Status']],
    body: tasks.map((task) => [
      task.title,
      task.description || '-',
      task.isCompleted ? 'Completed' : 'Open',
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] },
  })

  const saveName = `task-report-${new Date()
    .toLocaleDateString('en-ID')
    .replace(/\//g, '-')}.pdf`

  doc.save(saveName)
}
