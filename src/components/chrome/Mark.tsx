/** Fixed "SF" top-left. Difference blending keeps it legible over every block colour. */
export function Mark() {
  return (
    <div className="mark" aria-hidden="true">
      SF<span className="mark__est">EST. 2008</span>
    </div>
  );
}
