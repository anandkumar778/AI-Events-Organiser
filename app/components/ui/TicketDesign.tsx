import React from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

interface TicketDesignProps {
  booking: {
    id: string;
    bookingReference: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    ticketCount: number;
    totalPrice: number;
    status: string;
    eventImage?: string;
  };
}

export const TicketDesign = React.forwardRef<HTMLDivElement, TicketDesignProps>(({ booking }, ref) => {
  // Format date and time
  const dateObj = new Date(booking.eventDate || new Date());
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();
  const formattedTime = dateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).toUpperCase();

  const fallbackImage = "https://images.unsplash.com/photo-1540039155733-d7696d44508a?q=80&w=1000&auto=format&fit=crop";

  return (
    <div 
      ref={ref}
      style={{
        width: '1000px',
        height: '400px',
        backgroundColor: '#f3f4f6', // Light gray background to show ticket shadow
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div 
        style={{
          display: 'flex',
          width: '900px',
          height: '350px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          position: 'relative'
        }}
      >
        {/* Left Vertical Strip */}
        <div style={{
          width: '50px',
          backgroundColor: '#7c3aed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          color: 'white'
        }}>
          <span style={{ fontSize: '20px' }}>★</span>
          <span style={{
            transform: 'rotate(-90deg)',
            whiteSpace: 'nowrap',
            letterSpacing: '4px',
            fontSize: '14px',
            fontWeight: '600'
          }}>ADMIT ONE</span>
          <span style={{ fontSize: '20px' }}>★</span>
        </div>

        {/* Event Image */}
        <div style={{
          width: '250px',
          height: '100%',
          backgroundImage: `url(${booking.eventImage || fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

        {/* Middle Section (Details) */}
        <div style={{
          flex: 1,
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          <p style={{ color: '#7c3aed', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>
            AI EVENT ORGANISER
          </p>
          <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#111827', lineHeight: '1', marginBottom: '8px', textTransform: 'uppercase' }}>
            {booking.eventTitle}
          </h1>
          <p style={{ color: '#4b5563', fontSize: '12px', letterSpacing: '2px', marginBottom: '30px', textTransform: 'uppercase' }}>
            LIVE MUSIC • GOOD VIBES • GREAT MEMORIES
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
            {/* Date */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                📅
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600', letterSpacing: '1px' }}>DATE</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>{formattedDate}</p>
              </div>
            </div>

            {/* Time */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                🕒
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600', letterSpacing: '1px' }}>TIME</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>{formattedTime} ONWARDS</p>
              </div>
            </div>

            {/* Venue */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                📍
              </div>
              <div>
                <p style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600', letterSpacing: '1px' }}>VENUE</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>{booking.eventLocation}</p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed #e5e7eb', paddingTop: '20px', marginTop: '10px' }}>
            <div>
              <p style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600' }}>GATE</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>A2</p>
            </div>
            <div>
              <p style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600' }}>ROW</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>07</p>
            </div>
            <div>
              <p style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600' }}>SEAT</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>23</p>
            </div>
            <div>
              <p style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600' }}>PRICE</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#7c3aed' }}>₹{booking.totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Right Section (Stub) */}
        <div style={{
          width: '280px',
          backgroundColor: '#0f172a',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '2px dashed #334155',
          position: 'relative'
        }}>
          {/* Perforation Cutouts */}
          <div style={{ position: 'absolute', left: '-12px', top: '-12px', width: '24px', height: '24px', backgroundColor: '#f3f4f6', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', left: '-12px', bottom: '-12px', width: '24px', height: '24px', backgroundColor: '#f3f4f6', borderRadius: '50%' }} />

          <div>
            <p style={{ color: '#94a3b8', fontSize: '10px', letterSpacing: '1px' }}>TICKET</p>
            <p style={{ color: '#a855f7', fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>ADMIT ONE</p>
            <div style={{ height: '1px', backgroundColor: '#334155', margin: '15px 0' }} />
          </div>

          <div>
            <p style={{ color: '#94a3b8', fontSize: '10px', letterSpacing: '1px' }}>TICKET ID</p>
            <p style={{ color: '#f8fafc', fontSize: '12px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '15px' }}>
              {booking.bookingReference.toUpperCase()}
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', alignSelf: 'center', marginBottom: '20px' }}>
            <QRCode value={booking.bookingReference} size={100} />
          </div>

          <div style={{ alignSelf: 'center', marginBottom: '20px', overflow: 'hidden', height: '40px', display: 'flex', alignItems: 'center' }}>
            <Barcode value={booking.bookingReference.substring(0, 10)} format="CODE128" width={1.5} height={40} displayValue={false} background="transparent" lineColor="#ffffff" />
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '10px' }}>THANK YOU!</p>
              <p style={{ color: '#e2e8f0', fontSize: '12px', letterSpacing: '1px' }}>ENJOY THE EVENT</p>
            </div>
            <span style={{ color: '#a855f7', fontSize: '16px' }}>♥</span>
          </div>
        </div>

      </div>
    </div>
  );
});

TicketDesign.displayName = 'TicketDesign';
