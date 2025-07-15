// pages/about.js

import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>About This To-Do App</h1>
        <p>
          This is a simple fullstack to-do application built with Next.js and MongoDB.
          It helps you manage your daily tasks. You can add, mark as complete, delete, and update your tasks.
        </p>
        <p>
          Created by Rimsha with 💙 for learning and productivity.
        </p>
      </div>
    </>
  );
}
