const TeamPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <p>Team member id: {params.id}</p>
    </div>
  )
}

export default TeamPage