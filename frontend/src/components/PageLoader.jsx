function PageLoader() {
  return (
    <div className="pageLoader">
      <div className="topLoader" />

      <main className="page skeletonPage">
        <section className="skeletonHero skeleton" />

        <section className="statsGrid">
          <div className="skeletonStat skeleton" />
          <div className="skeletonStat skeleton" />
          <div className="skeletonStat skeleton" />
          <div className="skeletonStat skeleton" />
        </section>

        <section className="panel skeletonPanel">
          <div className="skeletonLine large skeleton" />
          <div className="skeletonLine skeleton" />
          <div className="skeletonLine skeleton" />
          <div className="skeletonLine skeleton" />
        </section>
      </main>
    </div>
  );
}

export default PageLoader;