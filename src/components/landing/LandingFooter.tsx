export default function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-8 text-xs text-gray-400">
         <span>Made for learners who want to remember, not just re-read.</span>
        <span>© {new Date().getFullYear()} StudyLab. All rights reserved.</span>
      </div>
    </footer>
  );
}