import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useBookings, useServices } from '../../contexts/AppDataContext';

const BookingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { userBookings } = useBookings();
  const { getServiceById } = useServices();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return theme.colors.status.success;
      case 'pending': return theme.colors.status.warning;
      case 'completed': return theme.colors.status.success;
      case 'cancelled': return theme.colors.status.error;
      default: return theme.colors.text.secondary;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            📅 My Bookings
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Your photography sessions and appointments
          </Text>
        </View>

        {userBookings.length > 0 ? (
          <View style={styles.bookingsList}>
            {userBookings.map((booking) => {
              const service = getServiceById(booking.serviceId);
              return (
                <TouchableOpacity 
                  key={booking.id}
                  style={[styles.bookingCard, { backgroundColor: theme.colors.background.secondary }]}
                >
                  <View style={styles.bookingHeader}>
                    <Text style={[styles.serviceName, { color: theme.colors.text.primary }]}>
                      {service?.title || 'Service'}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                      <Text style={[styles.statusText, { color: theme.colors.text.inverse }]}>
                        {booking.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.bookingDate, { color: theme.colors.text.secondary }]}>
                    📅 {formatDate(booking.date)}
                  </Text>
                  
                  <Text style={[styles.bookingLocation, { color: theme.colors.text.secondary }]}>
                    📍 {booking.location}
                  </Text>
                  
                  <View style={styles.bookingFooter}>
                    <Text style={[styles.bookingAmount, { color: theme.colors.text.accent }]}>
                      ₹{booking.totalAmount.toLocaleString()}
                    </Text>
                    {booking.paidAmount > 0 && (
                      <Text style={[styles.paidAmount, { color: theme.colors.status.success }]}>
                        Paid: ₹{booking.paidAmount.toLocaleString()}
                      </Text>
                    )}
                  </View>
                  
                  {booking.notes && (
                    <Text style={[styles.bookingNotes, { color: theme.colors.text.tertiary }]}>
                      💬 {booking.notes}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={[styles.emptyState, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.emptyStateEmoji, { color: theme.colors.text.tertiary }]}>📷</Text>
            <Text style={[styles.emptyStateText, { color: theme.colors.text.tertiary }]}>
              No bookings yet
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: theme.colors.text.tertiary }]}>
              Book your first photography session from the Home tab
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  bookingsList: {
    flex: 1,
  },
  bookingCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookingDate: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookingLocation: {
    fontSize: 14,
    marginBottom: 12,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paidAmount: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookingNotes: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  emptyState: {
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default BookingsScreen; 