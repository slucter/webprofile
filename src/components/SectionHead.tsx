/**
 * Header section: label mono + hitungan opsional di kanan, dipisah garis rambut.
 * Membuat tiap section terbaca seperti header tabel.
 */
export function SectionHead({ label, count }: { label: string; count?: string }) {
  return (
    <div className="section-head">
      <h2 className="section-label anim-label">{label}</h2>
      {count && <span className="section-count anim-label">{count}</span>}
    </div>
  )
}
